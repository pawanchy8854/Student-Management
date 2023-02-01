import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import { NavLink, useParams,useNavigate } from 'react-router-dom';

const Details = () => {

  const navigate = useNavigate("");

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {


    const res = await fetch(`/getuser/${id}`, {
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
  }, []);


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
      console.log("Error! Can't delete now !");
    } else {
      alert("Employee will be deleted paemanently !");
      console.log("Employee deleted successfully !");
      navigate("/");
    }
  }


  return (
    <div className='container mt=3'>
      <h1 style={{ fontweight: 400 }}>Detail View</h1>

      <Card className="card border border-success shadow-0 mb-3" sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className='add_btn'>
            <NavLink to={`/edit/${getuserdata._id}`}><button className='btn btn-warning mx-2'><EditIcon /></button></NavLink>
            <button className='btn btn-danger' onClick={() => deleteuser(getuserdata._id)}><DeleteIcon /></button>
          </div>
          <div className='row'>
            <div className='left_view col-lg-6 col-md-6 col-12'>
              <img src='/profile.png' style={{ width: 50 }} alt='profile' />
              <h3 className='mt-3'>Name: <span>{getuserdata.name}</span></h3>
              <h3 className='mt-3'>Age: <span>{getuserdata.age}</span></h3>
              <p className='mt-3'><EmailIcon />Email:<span>{getuserdata.email}</span></p>
              <p className='mt-3'><PhoneIphoneIcon />Mobile:<span>{getuserdata.mobile}</span></p>
            </div>
            <div className='right_view col-lg-6 col-md-6 col-12'>
              <p className='mt-4'><WorkIcon />Position:<span>{getuserdata.work}</span></p>
              <p className='mt-3'><LocationOnIcon />Address:<span>{getuserdata.add}</span></p>
              <p className='mt-3'><DescriptionIcon />Description:<span>{getuserdata.desc}</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Details