import React from "react"

const ExpanableComponent = ({ data }) =>
    <div className="w-full flex justify-center flex-column">
        <table className="min-w-max w-1/2 table-auto m-8">
            <caption className="font-semibold text-xl text-blueGray-700">{data.name} appears in:</caption>
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Title</th>
                    <th className="py-3 px-6 text-left">Director</th>
                    <th className="py-3 px-6 text-left">Release Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.films.map((film, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="py-3 px-6 text-left">{film.title}</td>
                            <td className="py-3 px-6 text-left">{film.director}</td>
                            <td className="py-3 px-6 text-left">{film.release_date}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>

export default ExpanableComponent