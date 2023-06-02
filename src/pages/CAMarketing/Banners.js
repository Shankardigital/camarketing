import React, { useState, useEffect } from "react";
import {
    CardBody, CardHeader, Container,
    Row, Col, Card, CardText, CardTitle,
    Form, Label, Input, Button, Table,
    Pagination,
    PaginationItem,
    PaginationLink, Modal,
} from "reactstrap"
// import img1 from "../assets/images/latest/car1.jpg"

//Import Breadcrumb
// import Breadcrumbs from "../components/Common/Breadcrumb"
import Breadcrumbs from "../../components/Common/Breadcrumb";
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from "react-paginate";
// import { URL } from "../../Apiurls";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import img3 from "../../assets/images/crypto/blog/img-3.jpg"
import { addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Banner = () => {
    const [modal_small, setmodal_small] = useState(false);
    const [banner, setbanner] = useState([])
    const [form, setform] = useState({name:""})
    const [form1, setform1] = useState([])
    console.log(form1)
    const [form2, setform2] = useState([])
    const [Files, setFiles] = useState({bannerImage:""});
    const [Files1, setFiles1] = useState({bannerImage:""});

    const history = useHistory();

    const changeHandler = (e) => {
        setFiles(e.target.files);
    };
    const changeHandler1 = (e) => {
        setFiles1(e.target.files);
    };

    function tog_small() {
        setmodal_small(!modal_small);
        removeBodyCss();
    }

    const handleChange = (e) => {
        let myUser = { ...form };
        myUser[e.target.name] = e.target.value;
        setform(myUser);
    };
    const handleChange1 = (e) => {
        let myUser = { ...form1 };
        myUser[e.target.name] = e.target.value;
        setform1(myUser);
    };

    const [items, setItems] = useState([]);
    const [userinfo, setuserinfo] = useState([]);
    console.log(items.token)
    console.log(userinfo)

      // get all function

    const getAllbenners = async() => {
       const resonse = await addData("banner/getall")
    var _data = resonse
    setbanner(_data.data.bannerResult)
    }

    useEffect(() => {
        getAllbenners();
    }, []);


    const [listPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);

    const pagesVisited = pageNumber * listPerPage;
    const lists = banner.slice(pagesVisited, pagesVisited + listPerPage);
    const pageCount = Math.ceil(banner.length / listPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

      // Add function

    const addbenners = async(e) => {
        e.preventDefault()
        const dataArray = new FormData();
        dataArray.append("name", form.name);
        for (let i = 0; i < Files.length; i++) {
            dataArray.append("bannerImage", Files[i]);
        }
        try {
            const resonse = await addData("banner/add", dataArray)
            var _data = resonse
            console.log(_data)
            setFiles({bannerImage:""})
            setform({name:""})
            toast.success(_data.data.message)
            getAllbenners()
          } catch (error) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(error.response.data.message)
            } else {
              toast.error("An error occurred. Please try again.")
            }
          }
    }

    // Edit fuction
    const editbenners = async(e) => {
        e.preventDefault()
        const dataArray = new FormData();
        dataArray.append("name", form1.name);
        dataArray.append("status", form1.status);
        for (let i = 0; i < Files1.length; i++) {
            dataArray.append("bannerImage", Files1[i]);
        }
        try {
            const resonse = await updateData("banner/edit/"+ form1._id, dataArray)
            var _data = resonse
            console.log(_data)
            setFiles1({bannerImage:""})
            toast.success(_data.data.message)
            clearForm()
            setmodal_small(false)
            getAllbenners()
          } catch (error) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(error.response.data.message)
            } else {
              toast.error("An error occurred. Please try again.")
            }
          }
    }

      // Delete fuction

    const deletebenners = async(data) => {
        try {
            const resonse = await deletedData("banner/deletebannerbyid/"+ data._id, {})
            var _data = resonse
            console.log(_data)
            toast.success(_data.data.message)
            getAllbenners()
          } catch (error) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(error.response.data.message)
            } else {
              toast.error("An error occurred. Please try again.")
            }
          }
    }

    const manageDelete = (data) => {
        const confirmBox = window.confirm("Do you really want to Delete?");
        if (confirmBox === true) {
            deletebenners(data);
        }
    };

    const clearForm = () => {
        setform({
            name: "",
            bannerImage: "",
        });
    };

    const getpopup = (data) => {
        setform1(data);
        tog_small()
    };

    const [forms, setforms] = useState([]);
    console.log(forms)

  // Search fuction
    const handleSearch = async(e) => {
        const resonse = await addData("banner/search?searchQuery="+ e.target.value)
        var _data = resonse
        setbanner(_data.data.bannerResult)
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="CA Marketing" breadcrumbItem="Banners" />
                    {/* {permissioins.banner === true || roles === "admin" ? ( */}

                        <Row>
                            <Col md={4}>
                                <Card>
                                    <CardHeader className="bg-white">
                                        <CardTitle>Add Banner</CardTitle>
                                    </CardHeader>
                                    <CardBody >
                                   
                                            <Form onSubmit={(e) => {
                                                addbenners(e);
                                            }}>
                                                <div className="mb-3">
                                                    <Label for="basicpill-firstname-input1">
                                                        Name <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="basicpill-firstname-input1"
                                                        placeholder="Enter Bannner Name"
                                                        required
                                                        name="name"
                                                        value={form.name}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <Label for="basicpill-firstname-input1">
                                                        Banner Image <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="file"
                                                        className="form-control"
                                                        id="basicpill-firstname-input1"
                                                        placeholder="Enter image"
                                                        required
                                                        name="bannerImage"
                                                        value={Files.bannerImage}
                                                        onChange={changeHandler}
                                                    />
                                                </div>

                                                <div className="mt-4" style={{ float: "right" }}>
                                                    <Button color="primary" type="submit">
                                                        Submit <i className="fas fa-check-circle"></i>
                                                    </Button>

                                                </div>
                                            </Form>
                                     
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={8}>
                                <Card>
                                    <CardHeader className="bg-white">
                                        <CardTitle>Banners List</CardTitle>
                                    </CardHeader>

                                    <CardBody >

                                        <div>
                                            <div className="table-responsive">
                                                <div style={{ float: "right" }}>
                                                    <Input
                                                        type="text"
                                                        name="search"
                                                        onChange={handleSearch}
                                                        className="form-control" placeholder="Search.." />
                                                </div>
                                                <Table className="table table-bordered mb-4 mt-5">
                                                    <thead>
                                                        <tr>
                                                            <th>S No</th>
                                                            <th>Banner Name</th>
                                                            <th>Banner Image</th>
                                                            <th>Status</th>
                                                            <th style={{ width: "100px" }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {lists.map((data, key) => (
                                                            <tr key={key}>
                                                                <td> {(pageNumber - 1) * 5 + key + 6}</td>
                                                                <td>{data.name} </td>
                                                                <td><img style={{ width: "100px" }} src={imgUrl + data.bannerImage} /></td>
                                                                <td>{data.status}
                                                                </td>
                                                                <td>
                                                                        <Button onClick={() => {
                                                                            getpopup(data);
                                                                        }}
                                                                            className="mr-2" style={{ padding: "6px", margin: "3px" }} color="success" outline>
                                                                            <i className="bx bx-edit "></i>
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => {
                                                                                manageDelete(data);
                                                                            }}
                                                                            style={{ padding: "6px", margin: "3px" }} color="danger" outline>
                                                                            <i className="bx bx-trash"></i>
                                                                        </Button>
                                                                </td>
                                                            </tr>

                                                        ))} 

                                                    </tbody>
                                                </Table>
                                              
                                                <div className="mt-3" style={{ float: "right" }}>
                                              
                                                    <ReactPaginate
                                                        previousLabel={"Previous"}
                                                        nextLabel={"Next"}
                                                        pageCount={pageCount}
                                                        onPageChange={changePage}
                                                        containerClassName={"pagination"}
                                                        previousLinkClassName={"previousBttn"}
                                                        nextLinkClassName={"nextBttn"}
                                                        disabledClassName={"disabled"}
                                                        activeClassName={"active"}
                                                        total={lists.length}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                   


                </Container>


                <Modal
                    size="sm"
                    isOpen={modal_small}
                    toggle={() => {
                        tog_small();
                    }}
                >
                    <div className="modal-header">
                        <h5
                            className="modal-title mt-0"
                            id="mySmallModalLabel"
                        >
                            Edit Banners
                        </h5>
                        <button
                            onClick={() => {
                                setmodal_small(false);
                            }}
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form onSubmit={(e) => { editbenners(e) }}>
                            <div className="mb-3">
                                <Label for="basicpill-firstname-input1">
                                    Banner Name <span className="text-danger">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    placeholder="Enter Banner Name"
                                    required
                                    name="name"
                                    value={form1.name}
                                    onChange={(e) => {
                                        handleChange1(e);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <Label for="basicpill-firstname-input1">
                                    Banner Image
                                </Label>
                                <Input
                                    type="file"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    placeholder="Enter image"
                                    name="bannerImage"
                                    // value={form1.bannerImage}
                                    onChange={changeHandler1}
                                />
                            </div>
                            <div className="mb-3">
                                <Label for="basicpill-firstname-input3">
                                    Status <span className="text-danger">*</span>
                                </Label>
                                <select
                                    name="status"
                                    value={form1.status}
                                    onChange={(e) => {
                                        handleChange1(e);
                                    }}
                                    className="form-select">


                                    <option value="active">Active</option>
                                    <option value="inactive">In Active</option>
                                </select>
                            </div>
                           
                            <div style={{ float: "right" }}>
                                <Button onClick={() => {
                                    setmodal_small(false);
                                }} color="danger" type="button">
                                    Cancel <i className="fas fa-times-circle"></i>
                                </Button>
                                <Button className="m-1" color="primary" type="submit">
                                    Submit <i className="fas fa-check-circle"></i>
                                </Button>

                            </div>
                        </Form>
                    </div>
                </Modal>

                <Toaster />
            </div>
        </React.Fragment >
    )
}

export default Banner
