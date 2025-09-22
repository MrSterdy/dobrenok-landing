import { Employee } from '@/lib/types/employee';

interface EmployeeCardProps {
    employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
    return (
        <li className="bg-secondary rounded-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200">
            <img
                src={employee.cover_photo_url}
                alt={employee.name}
                className="bg-secondary w-full aspect-square object-cover object-top"
            />
            <div className="px-4 py-4">
                <h4 className="text-balance text-xl font-benzin font-medium">{employee.name}</h4>
                {employee.description && (
                    <p className="text-balance mt-2 text-muted-foreground line-clamp-4">
                        {employee.description}
                    </p>
                )}
            </div>
        </li>
    );
}
