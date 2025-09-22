import { Employee } from '@/lib/types/employee';
import { EmployeeCard } from './EmployeeCard';

interface EmployeeGroupProps {
    groupName: string;
    employees: Employee[];
}

export function EmployeeGroup({ groupName, employees }: EmployeeGroupProps) {
    return (
        <div className="flex flex-col">
            <h3 className="uppercase font-benzin text-balance text-2xl">{groupName}</h3>
            <ul className="grid grid-cols-4 gap-4 mt-9">
                {employees.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                ))}
            </ul>
        </div>
    );
}
