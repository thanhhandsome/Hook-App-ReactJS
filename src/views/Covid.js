import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Covid = () => {

    const [dataCovid, setDataCovid] = useState([]);
    const [loading, setLoading] = useState(true);
    // const today = new Date(new Date().setHours(0, 0, 0, 0));
    // const priorDate = moment().subtract(31, 'days');
    const today = moment().startOf('day').toISOString(true);
    const priorDate = moment().startOf('day').subtract(31, 'days').toISOString(true);

    useEffect(() => {
        try {
            async function fetchData() {
                // https://api.covid19api.com/country/vietnam?from=2022-03-12T00:00:00Z&to=2022-04-12T00:00:00Z
                let res = await axios.get(`https://api.covid19api.com/country/vietnam?from=${priorDate}&to=${today}`);
                let data = res && res.data ? res.data : [];

                if (data && data.length > 0) {
                    data.map(item => {
                        item.Date = moment(item.Date).format('DD/MM/YYYY');
                        return item;
                    })
                    // data = data.reverse();
                }

                setDataCovid(data);
                setLoading(false);
            }
            fetchData();
        }
        catch (e) {
            alert(e.message);
        }

    }, []);

    return (
        <div style={{ background: '#282c34', color: 'white' }}>
            <table id="customers">
                {console.log('check data', dataCovid)}
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Comfirmed</th>
                        <th>Active</th>
                        <th>Deaths</th>
                        <th>Recovered</th>
                    </tr>
                </thead>
                <tbody>
                    {loading === false && dataCovid && dataCovid.length > 0 &&
                        dataCovid.map(item => {
                            return (
                                <tr key={item.ID}>
                                    <td>{item.Date}</td>
                                    <td>{item.Confirmed}</td>
                                    <td>{item.Active}</td>
                                    <td>{item.Deaths}</td>
                                    <td>{item.Recovered}</td>
                                </tr>
                            )
                        })
                    }
                    {loading === true
                        && <tr >
                            <td colSpan='5' style={{ 'textAlign': 'center' }}>Loading...</td>
                        </tr>
                    }

                </tbody>

            </table>
        </div>
    )
}

export default Covid