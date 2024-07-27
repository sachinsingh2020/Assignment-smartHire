import React, { useContext, useState } from 'react'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { MyContext } from '../context/MyContext';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#e2e9ff',
        width: '50%',
    },
};

Modal.setAppElement('#root');

const AllOperations = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { setNotes } = useContext(MyContext)

    const createNewNoteModal = () => {
        if (modalIsOpen === false) {
            openModal();
        } else {
            closeModal();
        }
    }

    const createNewNoteFunction = (e) => {
        e.preventDefault();
        console.log(id, title, content);

        if (localStorage.getItem('notes') === null) {
            localStorage.setItem('notes', JSON.stringify([]));
        }

        let myNotes = JSON.parse(localStorage.getItem('notes'));

        // Check if a note with the same id already exists
        const noteExists = myNotes.some(note => note.id === id);

        if (noteExists) {
            toast.warning("Note with the same id already exists.");
            closeModal();
            return; // Exit the function if the note already exists
        }

        // Add new note to the front of the array if it doesn't already exist
        myNotes.unshift({
            id: id,
            title: title,
            content: content,
            timestamp: Date.now(),
        });

        localStorage.setItem('notes', JSON.stringify(myNotes));
        setNotes(myNotes);
        toast.success("Note created successfully!");
        closeModal();
    }



    let subtitle;

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <div
                className='flex justify-center items-center flex-col py-4 text-gray-800 font-bold bg-gray-100 p-12 bg-[#fec107]'
            >
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-2xl px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={createNewNoteModal}>Create New Note</button>
                <div
                    className='w-full'
                >
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <div
                            className='w-full'
                        >
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}
                                className='text-2xl flex justify-center items-center flex-col py-4 text-white font-bold  p-12 underline'
                                style={{
                                    color: '#000 !important',
                                }}
                            >Create New Note</h2>
                            <div
                            >
                                <form
                                    className='flex justify-center items-center flex-col font-bold w-[100%] m-auto'
                                >
                                    <input type="text"
                                        onChange={(e) => setId(e.target.value)}
                                        style={{
                                            border: '1px solid black',
                                        }}
                                        placeholder="id" className='p-1.5 my-1 text-2xl w-[80%]  rounded-lg' />
                                    <input type="text"
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={{
                                            border: '1px solid black',
                                        }}
                                        placeholder="Title" className='p-1.5 my-1 text-2xl w-[80%]  rounded-lg' />
                                    <textarea type="text"
                                        onChange={(e) => setContent(e.target.value)}
                                        style={{
                                            border: '1px solid black',
                                        }}
                                        placeholder="Content" className='p-1.5 my-1 text-2xl w-[80%]  rounded-lg' />

                                    <div
                                        className='flex justify-evenly items-center py-4 text-gray-800 font-bold p-12'
                                    >
                                        <button
                                            onClick={createNewNoteFunction}
                                            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                                        >
                                            create
                                        </button>

                                        <button onClick={onclose} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-2xl px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Close</button>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </Modal>
                </div>

            </div>

        </div>



    )
}

export default AllOperations
