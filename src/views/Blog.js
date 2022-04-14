import axios from "axios";
import { useEffect, useState } from "react";
import './Blog.scss';
import { Link, useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddBlog from "./AddBlog";

const Blog = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let history = useHistory();
    const [newData, setNewData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        try {
            async function fetchData() {
                let res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
                let data = res && res.data ? res.data : [];

                let newData = [];
                if (data && data.length > 0) {
                    newData = data.slice(0, 9);

                }
                setNewData(newData);
                setLoading(false);
            }
            fetchData();
        }
        catch (e) {
            alert(e.message);
        }

    }, []);
    const handleAddBlog = (blog) => {
        // history.push('/add-blog');
        setShow(false);
        newData.unshift(blog);
        console.log('check:', newData);
    }
    return (
        <>


            <Button variant="primary" className="my-3" onClick={handleShow}>
                Add New
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Blogs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddBlog handleAddBlog={handleAddBlog} />
                </Modal.Body>
                {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer> */}
            </Modal>


            {/* <div><button className="btn-add-new" onClick={handleAddBlog}></button></div> */}
            <div className="blogs-container">
                {loading === false && newData && newData.length > 0 && newData.map(item => {
                    return (
                        <div className="single-blog" key={item.id}>
                            <div className="title">{item.title}</div>
                            <div className="content">{item.body}</div>
                            <button><Link to={`/blog/${item.id}`}>View details</Link></button>
                        </div>
                    )
                })}
                {loading === true
                    && <div style={{ textAlign: 'center !important', width: '100%' }}>
                        Loading...
                    </div>
                }
            </div>
        </>
    )
}

export default Blog;

