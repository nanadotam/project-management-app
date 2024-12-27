"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle } from 'lucide-react'

type ColumnType = 'Text' | 'Number' | 'Select' | 'Date' | 'Checkbox'

interface Column {
  id: string
  name: string
  type: ColumnType
}

interface Row {
  id: string
  [key: string]: any
}

const initialColumns: Column[] = [
  { id: '1', name: 'Task', type: 'Text' },
  { id: '2', name: 'Status', type: 'Select' },
  { id: '3', name: 'Due Date', type: 'Date' },
]

const initialRows: Row[] = [
  { id: '1', Task: 'Design mockups', Status: 'In Progress', 'Due Date': '2023-07-20' },
  { id: '2', Task: 'Implement frontend', Status: 'Not Started', 'Due Date': '2023-07-25' },
  { id: '3', Task: 'Backend integration', Status: 'Not Started', 'Due Date': '2023-07-30' },
]

export function CustomizableTable({ projectId }: { projectId: number }) {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [rows, setRows] = useState<Row[]>(initialRows)
  const [newColumnName, setNewColumnName] = useState('')
  const [newColumnType, setNewColumnType] = useState<ColumnType>('Text')

  useEffect(() => {
    // Fetch project-specific table data using projectId
    // For now, we'll use the mock data
  }, [projectId])

  const addColumn = () => {
    if (newColumnName) {
      const newColumn: Column = {
        id: Date.now().toString(),
        name: newColumnName,
        type: newColumnType,
      }
      setColumns([...columns, newColumn])
      setNewColumnName('')
      setNewColumnType('Text')
    }
  }

  const renderCell = (row: Row, column: Column) => {
    switch (column.type) {
      case 'Text':
      case 'Number':
        return <Input value={row[column.name] || ''} onChange={(e) => updateCell(row.id, column.name, e.target.value)} />
      case 'Select':
        return (
          <Select value={row[column.name] || ''} onValueChange={(value) => updateCell(row.id, column.name, value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        )
      case 'Date':
        return <Input type="date" value={row[column.name] || ''} onChange={(e) => updateCell(row.id, column.name, e.target.value)} />
      case 'Checkbox':
        return <Checkbox checked={row[column.name] || false} onCheckedChange={(checked) => updateCell(row.id, column.name, checked)} />
      default:
        return row[column.name] || ''
    }
  }

  const updateCell = (rowId: string, columnName: string, value: any) => {
    setRows(rows.map(row =>
      row.id === rowId ? { ...row, [columnName]: value } : row
    ))
  }

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        <Input
          placeholder="New column name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
        <Select value={newColumnType} onValueChange={(value: ColumnType) => setNewColumnType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Column type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="Number">Number</SelectItem>
            <SelectItem value="Select">Select</SelectItem>
            <SelectItem value="Date">Date</SelectItem>
            <SelectItem value="Checkbox">Checkbox</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addColumn}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Column
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.id}>{column.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {columns.map(column => (
                <TableCell key={`${row.id}-${column.id}`}>
                  {renderCell(row, column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

