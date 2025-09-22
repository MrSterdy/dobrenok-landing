import { getProjectEmployees } from '@/lib/api/projects/project/get-project-employees';
import { Employee, GroupedEmployees } from '@/lib/types/employee';
import { EmployeeGroup } from '@/app/team/components/EmployeeGroup';

async function getAllEmployees(): Promise<Employee[]> {
    try {
        // Fetch first page to get pagination info
        const firstResponse = await getProjectEmployees({
            page: 1,
            per_page: 50
        });

        if (!firstResponse.success) {
            return [];
        }

        const allEmployees: Employee[] = [...firstResponse.data];
        const lastPage = firstResponse.meta?.pagination.last_page || 1;

        // If there are more pages, fetch them all in parallel
        if (lastPage > 1) {
            const pagePromises = [];

            // Create promises for all remaining pages
            for (let page = 2; page <= lastPage; page++) {
                pagePromises.push(
                    getProjectEmployees({
                        page,
                        per_page: 50
                    })
                );
            }

            // Execute all requests in parallel
            const responses = await Promise.all(pagePromises);

            // Collect all successful responses
            responses.forEach(response => {
                if (response.success) {
                    allEmployees.push(...response.data);
                }
            });
        }

        // Sort all employees alphabetically by name
        return allEmployees.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    } catch (error) {
        console.error('Failed to fetch employees:', error);
        return [];
    }
}

function groupEmployeesByGroup(employees: Employee[]): GroupedEmployees {
    return employees.reduce((groups: GroupedEmployees, employee) => {
        const group = employee.group || 'Без группы';
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(employee);
        return groups;
    }, {});
}

export async function TeamSection() {
    const employees = await getAllEmployees();
    const groupedEmployees = groupEmployeesByGroup(employees);

    if (employees.length === 0) {
        return (
            <section className="mt-12 mx-auto max-w-screen-xl w-full px-6">
                <h2 className="uppercase font-benzin text-center text-balance text-4xl">Наша команда</h2>
                <p className="text-center text-muted-foreground mt-16">Сотрудники не найдены</p>
            </section>
        );
    }

    return (
        <section className="mt-12 mx-auto max-w-screen-xl w-full px-6">
            <h2 className="uppercase font-benzin text-center text-balance text-4xl">Наша команда</h2>
            <div className="flex flex-col gap-18 mt-18">
                {Object.entries(groupedEmployees).map(([groupName, groupEmployees]) => (
                    <EmployeeGroup
                        key={groupName}
                        groupName={groupName}
                        employees={groupEmployees}
                    />
                ))}
            </div>
        </section>
    );
}
