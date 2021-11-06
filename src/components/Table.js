import axios from "axios"
import React, { useEffect, useMemo, useState } from "react"
import DataTable from "react-data-table-component"
import ExpanableComponent from "./ExpanableComponent"

const CharactersTable = () => {
    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1)
    const [totalRows, setTotalRows] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')

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
    ]

    useEffect(() => {
        fetchAndDisplay()
    }, [page])

    const fetchAndDisplay = async () => {
        setLoading(true)
        const res = await axios.get(`https://swapi.dev/api/people/?page=${page}`)
        await displayPeople(res.data.results)
        setTotalRows(res.data.count)
        setLoading(false)
    }

    const displayPeople = async (data) => {
        const personData = await Promise.all(
            data.map(async (person) => {
                return { ...person, films: await getFilms(person.films) }
            })
        )
        for (const person of personData) {
            const homeworld_url = person.homeworld
            const homeWorldResponse = await axios.get(homeworld_url)
            person.homeworld = homeWorldResponse.data.name
        }
        setCharacters(personData)
    }

    const getFilms = (film_urls) => {
        return Promise.all(
            film_urls.map(async (film_url) => {
                const res = await axios.get(film_url)
                return res.data
            })
        )
    }

    const filteredItems = characters.filter(
        character => character.name && character.name.toLowerCase().includes(searchText.toLowerCase()),
    )

    const subHeaderComponentSearch = useMemo(() => {
        return (
            <input type="search" placeholder="Search.." onChange={(e) => setSearchText(e.target.value)} />
        )
    }, [])

    return (
        <>
            {console.log(filteredItems)}
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
                expandableRows
                expandableRowsComponent={ExpanableComponent}
            />
        </>
    )
}

export default CharactersTable