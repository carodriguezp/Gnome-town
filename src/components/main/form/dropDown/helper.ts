import { getDataFromApi } from "../../../../services/api";

export async function getJobList() {

    const allGnomes = await getDataFromApi()


    // Crear un array plano de todos los trabajos de los gnomos
    const allJobs = allGnomes.flatMap((gnome) => gnome.job);


    // Filtrar los trabajos únicos
    const uniqueJobs = allJobs.filter((job, index, self) => self.indexOf(job.trim()) === index);


    // Ordenar alfabéticamente
    const sortedUniqueJobs = uniqueJobs.sort();

    const sortedWithUnemployed = sortedUniqueJobs.push("Unemployed")

    const sortedWithDefault = sortedUniqueJobs.unshift("All")

    return sortedUniqueJobs;

}
