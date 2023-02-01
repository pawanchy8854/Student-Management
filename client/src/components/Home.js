import React, { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const getdata = async (e) => {


        const res = await fetch("/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert("error");
        } else {
            setUserdata(data)
            console.log("get data");
        }
    }


    useEffect(() => {
        getdata();
    }, [])


    const deleteuser = async (id) => {

        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            alert("Client will be deleted parmanently !");
            console.log("user deleted");
            getdata();
        }
    }


    return (
        <>
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Welcome!</strong> to Dashboard Mr Pawan
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div className='mt-5'>
                <div className='container'>
                    <div className='add_btn mt-2 mb-2'>
                        <NavLink to="/register" className='btn btn-info'>Add <PersonAddAlt1Icon /></NavLink>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Post</th>
                                <th scope="col">Number</th>
                                <th className='table-dark-action' scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr class="table-secondary">
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className='d-flex justify-content-between'>
                                                    <NavLink to={`view/${element._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}><button className='btn btn-warning'><EditIcon /></button></NavLink>
                                                    <button className='btn btn-danger' onClick={() => deleteuser(element._id)}><DeleteIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    )
}

export default Home