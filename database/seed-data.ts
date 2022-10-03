interface SeedData {
    entries: SeedEntry[]
}


interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seeData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Cualquier tarea inicial',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'En Progreso: lorem ipmdtfa fd ase ta ',
            status: 'in-progress',
            createdAt: Date.now() - 10000000
        },
        {
            description: 'Completada: d sfalo otra dtra dfl',
            status: 'finished',
            createdAt: Date.now() - 100000
        },
    ]
}