import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import NoteCard from '../Assets/NoteCard.jsx';
import { MyContext } from '../context/MyContext.jsx';

const AllNotes = ({ itemsPerPage = 10 }) => {

    const { notes } = useContext(MyContext);

    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(notes.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(notes.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, notes]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % notes.length;
        setItemOffset(newOffset);
    };

    function Items({ notes }) {
        return (
            <div className='flex justify-center notes-center flex-wrap py-4 text-gray-800 font-bold bg-gray-100 p-2 md:p-12  m-8'>
                {notes.map((note, index) => (
                    <NoteCard key={index} note={note} />
                ))}
            </div>
        );
    }

    return (
        <div

        >
            <Items notes={currentItems} />
            <div
                style={{
                    backgroundColor: '#ff9700',
                }}
            >
                <ReactPaginate
                    className='flex justify-evenly items-center flex-col md:flex-row py-4 font-bold bg-gray-100 p-12  w-[50%] m-auto mb-20 md:mb-12 '
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </div>

        </div>
    );
}

export default AllNotes;
