import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './Blog.scss';

const DetailBlog = () => {
    let { id } = useParams();
    const history = useHistory();
    const [detailBlog, setDetailBlog] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        try {
            async function fetchData() {
                let res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`, false);
                let data = res && res.data ? res.data : [];


                setDetailBlog(data);
                setLoading(false);
            }
            fetchData();
        }
        catch (e) {
            alert(e.message);
        }

    }, []);


    const handleBack = () => {
        history.push("/blog");
    }

    return (
        <>
            <div><span onClick={handleBack}>&lt;--Back</span></div>
            <div className="detail-blog">
                {detailBlog &&
                    <>
                        <div className="title">
                            ID: {id} --- {loading === true ? 'Loading...' : detailBlog.title}
                        </div>
                        <div className="content">
                            {detailBlog.body}
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default DetailBlog;