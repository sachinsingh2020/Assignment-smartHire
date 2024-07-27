import React, { useContext, useState } from 'react';
import "./NoteCard.css";
import { MyContext } from '../context/MyContext';
import Modal from 'react-modal';
import { toast } from 'react-toastify';


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

const NoteCard = ({ note }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { setNotes } = useContext(MyContext);

    const deleteNote = (noteId) => {
        let oldNotes = JSON.parse(localStorage.getItem('notes'));
        let newNotes = oldNotes.filter(note => note.id !== noteId);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        setNotes(newNotes);
        toast.success('Note deleted successfully');
    }

    const editNote = (noteId) => {
        let oldNotes = JSON.parse(localStorage.getItem('notes'));
        let noteToEdit = oldNotes.find(note => note.id === noteId);
        console.log(noteToEdit);
        setId(noteToEdit.id);
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
        openModal();
    }

    const editTheNote = (e) => {
        e.preventDefault();
        let oldNotes = JSON.parse(localStorage.getItem('notes'));
        let newNotes = oldNotes.map(note => {
            if (note.id === id) {
                return {
                    id: id,
                    title: title,
                    content: content,
                    timestamp: note.timestamp,
                }
            }
            toast.success('Note edited successfully');
            return note;
        });

        localStorage.setItem('notes', JSON.stringify(newNotes));
        setNotes(newNotes);
    }

    const formatDate = (timestamp) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(timestamp).toLocaleDateString('en-GB', options);
    };

    let subtitle;

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div
            className='px-3 m-4 text-gray-800 font-bold bg-gray-100 py-3 text-white rounded-lg text-center h-80 w-[30%]'
            key={note.id}

            style={{
                backgroundColor: '#009788',
            }}
        >
            <div className='w-full'>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='w-full'>
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}
                            className='text-2xl flex justify-center items-center flex-col py-4 text-white font-bold p-12 underline'
                            style={{ color: '#000 !important' }}
                        >
                            Edit Note
                        </h2>
                        <div>
                            <form className='flex justify-center items-center flex-col font-bold w-[100%] m-auto'>
                                <input
                                    type="text"
                                    onChange={(e) => setId(e.target.value)}
                                    value={id}
                                    style={{ border: '1px solid black' }}
                                    placeholder="id"
                                    className='p-1.5 my-1 text-2xl w-[80%] rounded-lg'
                                />
                                <input
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    style={{ border: '1px solid black' }}
                                    placeholder="Title"
                                    className='p-1.5 my-1 text-2xl w-[80%] rounded-lg'
                                />
                                <textarea
                                    type="text"
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                    style={{ border: '1px solid black' }}
                                    placeholder="Content"
                                    className='p-1.5 my-1 text-2xl w-[80%] rounded-lg'
                                />
                                <div className='flex justify-evenly items-center py-4 text-gray-800 font-bold p-12'>
                                    <button
                                        onClick={editTheNote}
                                        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                                    >
                                        Done
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-2xl px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
            <h1 className='text-2xl underline h-[15%] overflow-hidden'>{note.title}</h1>
            <div className='h-[52%] custom-scroll rounded-lg p-2' style={{ border: '1px solid white' }}>
                <div>{note.content}</div>
            </div>
            <p className='italic h-[15%] overflow-hidden'>{formatDate(note.timestamp)}</p>
            <div className='h-[18%] w-full flex justify-between px-12'>
                <button
                    className='bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-2 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-[8rem]'
                    onClick={() => deleteNote(note.id)}
                >
                    Delete
                </button>
                <button
                    className='bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 w-[8rem]'
                    onClick={() => editNote(note.id)}
                >
                    Edit
                </button>
            </div>
        </div>
    )
}

export default NoteCard;
