-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (Authentication will be handled by Supabase Auth)
create table users (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  notification_preferences jsonb default '{
    "email_notifications": true,
    "push_notifications": true,
    "task_reminders": true,
    "project_updates": true
  }'::jsonb
);

-- Projects table
create table projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  status text check (status in ('Planning', 'In Progress', 'Completed', 'On Hold')) default 'Planning',
  due_date date,
  progress integer default 0 check (progress >= 0 and progress <= 100),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references users(id) on delete set null
);

-- Teams table
create table teams (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  parent_team_id uuid references teams(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references users(id) on delete set null
);

-- Team Members junction table
create table team_members (
  team_id uuid references teams(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  role text check (role in ('Owner', 'Admin', 'Member')) default 'Member',
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (team_id, user_id)
);

-- Project Teams junction table
create table project_teams (
  project_id uuid references projects(id) on delete cascade,
  team_id uuid references teams(id) on delete cascade,
  primary key (project_id, team_id)
);

-- Tasks table
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  description text,
  status text check (status in ('Not Started', 'In Progress', 'Completed', 'On Hold')) default 'Not Started',
  due_date date,
  start_date date,
  duration integer,
  assigned_to uuid references users(id) on delete set null,
  created_by uuid references users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Events table
create table events (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  event_type text check (event_type in ('Meeting', 'Deadline', 'Milestone', 'Other')) not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  location text,
  is_all_day boolean default false,
  project_id uuid references projects(id) on delete cascade,
  created_by uuid references users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Custom Fields table
create table custom_fields (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  field_type text check (field_type in ('Text', 'Number', 'Select', 'Date', 'Checkbox')) not null,
  options jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Custom Field Values table
create table custom_field_values (
  task_id uuid references tasks(id) on delete cascade,
  field_id uuid references custom_fields(id) on delete cascade,
  value text,
  primary key (task_id, field_id)
);

-- Task Dependencies table
create table task_dependencies (
  dependent_task_id uuid references tasks(id) on delete cascade,
  dependency_task_id uuid references tasks(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (dependent_task_id, dependency_task_id),
  constraint no_self_dependency check (dependent_task_id != dependency_task_id)
);

-- Comments table
create table comments (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  user_id uuid references users(id) on delete set null,
  project_id uuid references projects(id) on delete cascade,
  task_id uuid references tasks(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint comment_target_check check (
    (project_id is null and task_id is not null) or
    (project_id is not null and task_id is null)
  )
);

-- Tags table
create table tags (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  color text default '#000000',
  project_id uuid references projects(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Task Tags junction table
create table task_tags (
  task_id uuid references tasks(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (task_id, tag_id)
);

-- Project Members table
create table project_members (
  project_id uuid references projects(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  role text check (role in ('Owner', 'Admin', 'Member', 'Viewer')) default 'Member',
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (project_id, user_id)
);

-- Audit Logs table
create table audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete set null,
  entity_type text not null check (entity_type in ('project', 'task', 'team')),
  entity_id uuid not null,
  action text not null check (action in ('create', 'update', 'delete')),
  changes jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Task Status History table
create table task_status_history (
  id uuid default uuid_generate_v4() primary key,
  task_id uuid references tasks(id) on delete cascade,
  old_status text,
  new_status text not null,
  changed_by uuid references users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Event Attendees table
create table event_attendees (
  event_id uuid references events(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  status text check (status in ('Pending', 'Accepted', 'Declined', 'Maybe')) default 'Pending',
  primary key (event_id, user_id)
);

-- Helper Functions
create or replace function is_team_member(team_id uuid) returns boolean as $$
begin
  return exists (
    select 1 from team_members
    where team_id = $1 and user_id = auth.uid()
  );
end;
$$ language plpgsql security definer;

create or replace function is_project_member(project_id uuid) returns boolean as $$
begin
  return exists (
    select 1 from project_members
    where project_id = $1 and user_id = auth.uid()
  );
end;
$$ language plpgsql security definer;

-- Updated_At Trigger Function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger update_projects_updated_at
  before update on projects
  for each row
  execute function update_updated_at_column();

create trigger update_tasks_updated_at
  before update on tasks
  for each row
  execute function update_updated_at_column();

create trigger update_users_updated_at
  before update on users
  for each row
  execute function update_updated_at_column();

create trigger update_events_updated_at
  before update on events
  for each row
  execute function update_updated_at_column();

create trigger update_comments_updated_at
  before update on comments
  for each row
  execute function update_updated_at_column();

-- Indexes
create index if not exists idx_project_members_user_id on project_members(user_id);
create index if not exists idx_project_members_project_role on project_members(project_id, role);
create index if not exists idx_team_members_user_id on team_members(user_id);
create index if not exists idx_tasks_due_date on tasks(due_date);
create index if not exists idx_events_project_date on events(project_id, start_time);

-- Enable RLS
alter table users enable row level security;
alter table projects enable row level security;
alter table teams enable row level security;
alter table team_members enable row level security;
alter table project_teams enable row level security;
alter table tasks enable row level security;
alter table events enable row level security;
alter table custom_fields enable row level security;
alter table custom_field_values enable row level security;
alter table task_dependencies enable row level security;
alter table comments enable row level security;
alter table tags enable row level security;
alter table task_tags enable row level security;
alter table project_members enable row level security;
alter table audit_logs enable row level security;
alter table task_status_history enable row level security;
alter table event_attendees enable row level security;

-- RLS Policies
create policy "Users can view their own profile"
  on users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on users for update
  using (auth.uid() = id);

create policy "Team members can view projects"
  on projects for select
  using (exists (
    select 1 from project_members
    where project_id = id and user_id = auth.uid()
  ));

create policy "Project owners can update projects"
  on projects for update
  using (exists (
    select 1 from project_members
    where project_id = id 
    and user_id = auth.uid() 
    and role = 'Owner'
  ));

create policy "Project owners can delete projects"
  on projects for delete
  using (exists (
    select 1 from project_members
    where project_id = id 
    and user_id = auth.uid() 
    and role = 'Owner'
  ));

create policy "Authenticated users can create projects"
  on projects for insert
  with check (auth.uid() = created_by);

create policy "Project members can view tasks"
  on tasks for select
  using (is_project_member(project_id));

create policy "Project members can create tasks"
  on tasks for insert
  with check (is_project_member(project_id));

create policy "Task assignee or project admin can update tasks"
  on tasks for update
  using (
    auth.uid() = assigned_to or
    exists (
      select 1 from project_members
      where project_id = tasks.project_id
      and user_id = auth.uid()
      and role in ('Owner', 'Admin')
    )
  );

create policy "Project admins can delete tasks"
  on tasks for delete
  using (exists (
    select 1 from project_members
    where project_id = tasks.project_id
    and user_id = auth.uid()
    and role in ('Owner', 'Admin')
  ));

create policy "Team members can view team"
  on teams for select
  using (is_team_member(id));

create policy "Team admins can update team"
  on teams for update
  using (exists (
    select 1 from team_members
    where team_id = id
    and user_id = auth.uid()
    and role in ('Owner', 'Admin')
  ));

create policy "Authenticated users can create teams"
  on teams for insert
  with check (auth.uid() = created_by);

create policy "Project members can view events"
  on events for select
  using (is_project_member(project_id));

create policy "Project members can create events"
  on events for insert
  with check (is_project_member(project_id));

create policy "Project members can view comments"
  on comments for select
  using (
    (project_id is not null and is_project_member(project_id)) or
    (task_id is not null and exists (
      select 1 from tasks
      where id = task_id and is_project_member(project_id)
    ))
  );

create policy "Users can view audit logs for their projects"
  on audit_logs for select
  using (exists (
    select 1 from project_members
    where project_id = (
      case 
        when entity_type = 'project' then entity_id::uuid
        when entity_type = 'task' then (select project_id from tasks where id = entity_id::uuid)
        else null
      end
    )
    and user_id = auth.uid()
  ));

create policy "Project members can view task tags"
  on task_tags for select
  using (exists (
    select 1 from tasks
    where id = task_id and is_project_member(project_id)
  ));

create policy "Project members can create task tags"
  on task_tags for insert
  with check (exists (
    select 1 from tasks
    where id = task_id and is_project_member(project_id)
  ));