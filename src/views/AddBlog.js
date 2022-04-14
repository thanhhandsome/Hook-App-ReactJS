import './Blog.scss';
import { useState } from 'react';
import axios from 'axios';
const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleSubmit = async (props) => {
        // event.preventDefault();
        if (!title) {
            alert('empty title');
            return;
        }
        if (!content) {
            alert('empty content');
            return;
        }

        let data = {
            title: title,
            body: content,
            userId: 1,
        }
        let res = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
        if (res && res.data) {
            let newBlog = res.data;
            props.handleAddBlog(newBlog);
            // console.log('check data :', newBlog);
        }

    }
    return (
        <div className="add-new-container">
            {/* <form onSubmit={handleSubmit}> */}
            <div className="text-add-new">--- Add Blogs  ---</div>
            <div className="input-data">
                <label>Title: </label>
                <input type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="input-data">
                <label>Content: </label>
                <input type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button className="btn-add-new" onClick={handleSubmit}>Submit</button>
            {/* <button className="btn-add-new" type="submit">Submit</button> */}
            {/* </form> */}
        </div>
    )
}

export default AddBlog;