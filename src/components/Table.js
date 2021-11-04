import axios from "axios"
import React, { useEffect, useMemo, useState } from "react"
import DataTable from "react-data-table-component"
const CharactersTable = () => {
    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');


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
const filteredItems = characters.filter(
		character => character.name && character.name.toLowerCase().includes(searchText.toLowerCase()),
	);
const subHeaderComponentSearch= useMemo(()=>{
    return (
    <input type="search" placeholder="Search.." onChange={(e)=>setSearchText(e.target.value)} />
    )
},[])

    useEffect(() => {
        async function getSwapi() {
            setLoading(true)
            const peopleResponse = await axios.get(`https://swapi.dev/api/people/?page=${page}`)
            for (const character of peopleResponse.data.results) {
                const homeworld_url = character.homeworld;
                const homeWorldResponse = await axios.get(homeworld_url);
                character.homeworld = homeWorldResponse.data.name;
              }
              setLoading(false)
              setCharacters(peopleResponse.data.results)
              setTotalRows(peopleResponse.data.count)
        }
        getSwapi()
    }, [page])

    return (
        <>
            <DataTable
                title="Characters of Star Wars"
                columns={columns}
                data={filteredItems}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationComponentOptions={{
                    noRowsPerPage: true
                }}
                onChangePage={page => setPage(page)}
                progressPending={loading} 
                subHeader
                subHeaderComponent={subHeaderComponentSearch}               
            />
        </>
    )
}

export default CharactersTable