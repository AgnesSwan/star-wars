import axios from "axios"
import React, { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
const CharactersTable = () => {
    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Homeworld',
            selector: row => row.homeworld,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
        },
        {
            name: 'Hair color',
            selector: row => row.hair_color,
        },
        {
            name: 'Height',
            selector: row => row.height,
        },
        {
            name: 'Mass',
            selector: row => row.mass,
        },
        {
            name: 'Films',
            selector: row => row.films,
        },

    ];

    useEffect(() => {
        async function getSwapi() {
            const peopleRes = await axios.get(`https://swapi.dev/api/people/?page=${page}`)
            for (const character of peopleRes.data.results) {
                if (character) {
                const homeWorldUrl = character.homeworld
                const homeworldRes = await axios.get(homeWorldUrl)
                character.homeworld = homeworldRes.data.name
                characters.push(character)
            }}
            setCharacters(characters)
            setTotalRows(peopleRes.data.count)
        }
        getSwapi()
    }, [page,characters])
    useEffect(()=>{

    })

    return (
        <>
            <DataTable
                title="Users"
                columns={columns}
                data={characters}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationComponentOptions={{
                    noRowsPerPage: true
                }}
                onChangePage={page => setPage(page)}
            />
        </>
    )

}

export default CharactersTable