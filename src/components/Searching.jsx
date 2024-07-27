import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/MyContext.jsx'

const Searching = () => {
    const [search, setSearch] = useState('')

    const { setNotes } = useContext(MyContext)

    const searchFunction = (e) => {
        setSearch(e.target.value)

        let notes = JSON.parse(localStorage.getItem('notes'))
        let filteredNotes = notes.filter(note => {
            return note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase())
        })

        console.log(filteredNotes)
        setNotes(filteredNotes)

    }

    return (
        <div>
            <div
                className='flex justify-center items-center flex-col py-4 text-gray-800 font-bold bg-gray-100 p-12 bg-[#ff9700]'
                style={{
                    backgroundColor: '#ff9700',
                }}
            >
                <input
                    type='text'
                    onChange={searchFunction}
                    placeholder='Search By Title or Content '
                    className='p-2.5 text-2xl w-[80%]  rounded-lg'
                />
            </div>
        </div>
    )
}

export default Searching
