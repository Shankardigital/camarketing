import React, { useEffect, useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Button,
  Table,
  Label,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
// import { URL } from "../../Apiurls"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import ReactPaginate from "react-paginate"
import toast, { Toaster } from "react-hot-toast"
import { addData } from "Servicescalls"
import { imgUrl } from "Baseurls"
// import barcode from "../../assets/images/letast/barcode.jpg"
// import Barcode from "react-barcode";

const Users = () => {

  const history = useHistory()
  const [show, setshow] = useState(false)
  const [show1, setshow1] = useState(false)
  const toggle = () => setshow1(!show1)
  const [show13, setshow13] = useState(false)
  const toggle13 = () => setshow13(!show13)

  const [form, setform] = useState([])
  console.log(form)
  const [form1, setform1] = useState([])
  const [form2, setform2] = useState([])
  const [cities, setCities] = useState([])

  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }
  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }
  const handleChange2 = e => {
    let myUser = { ...form2 }
    myUser[e.target.name] = e.target.value
    setform2(myUser)
  }
  const handleChange3 = async(e) => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
    const bodydata ={
      state: e.target.value
    }
    const resonse = await addData("city/getcitybystateid", bodydata)
    var _data = resonse
    setCities(_data.data.cityResult)
  }
  const handleChange4 = async(e) => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
    const bodydata ={
      state: e.target.value
    }
    const resonse = await addData("city/getcitybystateid", bodydata)
    var _data = resonse
    setCities(_data.data.cityResult)
  }

  const [agents, setAgents] = useState([])

  // get all states

  const [states, setState] = useState([])
  const getAllStates = async () => {
    const resonse = await addData("state/getallactive")
    var _data = resonse
    setState(_data.data.activeStateResult)
  }

    // get all cities
 

  

  // get all

  const getAllAgents = async () => {
    const resonse = await addData("agent/getall")
    var _data = resonse
    setAgents(_data.data.AgentResult)
  }

  // Add function

  const addAgents = async e => {
    e.preventDefault()
    const bodydata = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      designation: form.designation,
      city: form.city,
      state: form.state,
      area: form.area,
      address: form.address,
      company: form.company,
      amountPercentage: form.amountPercentage,
    }
    try {
      const resonse = await addData("agent/add", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setshow(false)
      getAllAgents()
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

  // edit function
  const popup = (data) => {
    setform1(data)
    setshow1(true)
    handleChange4(data)
  }

  const EditAgents = async (e) => {
    e.preventDefault()
    const bodydata = {
      name: form1.name,
      email: form1.email,
      phone: form1.phone,
      designation: form1.designation,
      city: form1.city,
      state: form1.state,
      area: form1.area,
      address: form1.address,
      company: form1.company,
      amountPercentage: form1.amountPercentage,
      status: form1.status,
    }
    try {
      const resonse = await addData("agent/edit/" + form1._id, bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setshow1(false)
      getAllAgents()
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

  // search fuctions
  const agentSearch = async e => {
    const resonse = await addData("agent/search?searchQuery=" + e.target.value)
    var _data = resonse
    setAgents(_data.data.AgentResult)
  }

  // Delete function
  const popupdel = data => {
    setform2(data)
    setshow13(true)
  }

  const deleteAgents = async e => {
    e.preventDefault()
    const bodydata = {
      id: form2._id,
      password: form2.password,
    }
    try {
      const resonse = await addData("agent/delete", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setshow13(false)
      getAllAgents()
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

  const getByfunction = (data) => {
    sessionStorage.setItem("agentid", data._id)
    history.push("/users_details")
  }

  useEffect(() => {
    getAllStates()
    getAllAgents()
  }, [])

  const [listPerPage] = useState(10)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = agents.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(agents.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  //meta title
  //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="CA Marketing" breadcrumbItem="Agents" />
          {/* {permissioins.customerView === true || roles === "admin" ? ( */}

          <Row>
            <Col>
              {show == true ? (
                <Card className="p-4">
                  <Form
                    onSubmit={e => {
                      addAgents(e)
                    }}
                  >
                    <h5>Add New Agent</h5>
                    <br />
                    <Row>
                      <Col className="mt-3" md="3">
                        <Label> Name</Label>{" "}
                        <span className="text-danger">*</span>
                        <Input
                          name="name"
                          onChange={e => {
                            handleChange(e)
                          }}
                          required
                          type="text"
                          placeholder="Enter Name"
                        />
                      </Col>
                      <Col className="mt-3" md="3">
                        <Label>Email Id</Label>{" "}
                        <span className="text-danger">*</span>
                        <Input
                          name="email"
                          onChange={e => {
                            handleChange(e)
                          }}
                          required
                          type="email"
                          placeholder="Enter Email"
                        />
                      </Col>
                      <Col className="mt-3" md="3">
                        <Label>Mobile No</Label>{" "}
                        <span className="text-danger">*</span>
                        <div>
                          <Input
                            name="phone"
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile No"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </Col>
                      <Col className="mt-3" md="3">
                        <Label>Company Name</Label>{" "}
                        <span className="text-danger">*</span>
                        <div>
                          <Input
                            name="company"
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter Mobile No"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </Col>
                      <Col className="mt-3" md="3">
                        <Label>Designation</Label>{" "}
                        <span className="text-danger">*</span>
                        <div>
                          <Input
                            name="designation"
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter Designation"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </Col>
                      <Col className="mt-3" md="3">
                        <Label>Amount Percentage (%)</Label>{" "}
                        <span className="text-danger">*</span>
                        <div>
                          <Input
                            name="amountPercentage"
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter Amount Percentage"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </Col>
                      <Col className="mt-3" md="3">
                        <Label for="basicpill-firstname-input1">
                          States <span className="text-danger">*</span>
                        </Label>
                        <select
                          type="text"
                          className="form-select"
                          id="basicpill-firstname-input1"
                          placeholder="Enter Bannner Name"
                          required
                          name="state"
                          // value={form.name}
                          onChange={e => {
                            handleChange3(e)
                          }}
                        >
                          <option value="">Select</option>
                          {states.map((data, key) => (
                            <option key={key} value={data.stateName}>
                              {data.stateName}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col className="mt-3" md="3">
                        <Label for="basicpill-firstname-input1">
                          City <span className="text-danger">*</span>
                        </Label>
                        <select
                          className="form-select"
                          id="basicpill-firstname-input1"
                          placeholder="Enter city name"
                          required
                          name="city"
                          onChange={e => {
                            handleChange(e)
                          }}
                        >
                           <option value="">Select</option>
                          {cities.map((data, key) => (
                            <option key={key} value={data.city}>
                              {data.city}
                            </option>
                          ))}
                        </select>
                      </Col>

                      <Col className="mt-3" md="3">
                        <Label for="basicpill-firstname-input1">
                          Area <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="basicpill-firstname-input1"
                          placeholder="Enter city name"
                          required
                          name="area"
                          onChange={e => {
                            handleChange(e)
                          }}
                        />
                      </Col>

                      <Col className="mt-3" md="6">
                        <Label>Address</Label>{" "}
                        <span className="text-danger">*</span>
                        <div>
                          <textarea
                            name="address"
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter Address"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </Col>
                      {/* <Col md="3">
                                                <Label>Password</Label> <span className="text-danger">*</span>
                                                <Input name="password" onChange={(e) => { handleChange(e) }} required type="password" placeholder="Enter password" />
                                            </Col> */}
                    </Row>
                    <div className="text-end mt-4">
                      <Button type="submit" color="success m-1" outline>
                        Submit <i className="bx bx-check-circle"></i>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setshow(!show)
                        }}
                        color="danger m-1"
                        outline
                      >
                        Cancel <i className="bx bx-x-circle"></i>
                      </Button>
                    </div>
                  </Form>
                </Card>
              ) : (
                ""
              )}
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <Button
                        onClick={() => {
                          setshow(!show)
                        }}
                        color="primary"
                      >
                        New Agent <i className="bx bx-user-plus"></i>
                      </Button>
                    </Col>
                    <Col>
                      <div style={{ float: "right" }}>
                        <Input
                          name="search"
                          // value={form.search}
                          onChange={agentSearch}
                          type="search"
                          placeholder="Search..."
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="table-rep-plugin mt-4">
                    <Table hover bordered responsive>
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Agent id</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile No</th>
                          <th>Designation</th>
                          {/* <th>Area</th> */}
                          <th>Wallet</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.map((data, key) => (
                          <tr key={key}>
                            <th scope="row">
                              {(pageNumber - 1) * 10 + key + 11}
                            </th>
                            <td>{data.agentId}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.phone}</td>
                            <td>{data.designation}</td>
                            {/* <td>Kphb Colony</td> */}
                            <td>₹ {data.wallet}</td>
                            <td>{data.status}</td>
                            <td>
                              <Button
                                onClick={() => {
                                  popup(data)
                                }}
                                size="sm"
                                className="m-1"
                                outline
                                color="success"
                              >
                                <i
                                  style={{ fontSize: " 14px" }}
                                  className="bx bx-edit"
                                ></i>
                              </Button>
                                <Button
                                  size="sm"
                                  className="m-1"
                                  outline
                                  color="warning"
                                  onClick={()=>{getByfunction(data)}}
                                >
                                  <i
                                    style={{ fontSize: " 14px" }}
                                    className="fa fa-eye"
                                  ></i>
                                </Button>
                              <Button
                                size="sm"
                                className="m-1"
                                outline
                                color="danger"
                                onClick={() => {
                                  popupdel(data)
                                }}
                              >
                                <i
                                  style={{ fontSize: " 14px" }}
                                  className="fas fa-trash-alt"
                                ></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Col sm="12">
                      <div
                        className="d-flex mt-3 mb-1"
                        style={{ float: "right" }}
                      >
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
                    </Col>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Toaster />
      </div>
      <Modal isOpen={show1} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Agent Details</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              EditAgents(e)
            }}
          >
            <Row>
              <Col className="mt-3" md="6">
                <Label> Name</Label> <span className="text-danger">*</span>
                <Input
                  name="name"
                  value={form1.name}
                  onChange={e => {
                    handleChange1(e)
                  }}
                  required
                  type="text"
                  placeholder="Enter Name"
                />
              </Col>
              <Col className="mt-3" md="6">
                <Label>Email Id</Label> <span className="text-danger">*</span>
                <Input
                  name="email"
                  value={form1.email}
                  onChange={e => {
                    handleChange1(e)
                  }}
                  required
                  type="email"
                  placeholder="Enter Email"
                />
              </Col>
              <Col className="mt-3" md="6">
                <Label>Mobile No</Label> <span className="text-danger">*</span>
                <div>
                  <Input
                    name="phone"
                    value={form1.phone}
                    onChange={e => {
                      handleChange1(e)
                    }}
                    required
                    type="number"
                    className="form-control"
                    placeholder="Enter Mobile No"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </Col>
              <Col className="mt-3" md="6">
                <Label>Company Name</Label>{" "}
                <span className="text-danger">*</span>
                <div>
                  <Input
                    name="company"
                    value={form1.company}
                    onChange={e => {
                      handleChange1(e)
                    }}
                    required
                    type="text"
                    className="form-control"
                    placeholder="Enter Designation"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </Col>
              <Col className="mt-3" md="6">
                <Label>Designation</Label>{" "}
                <span className="text-danger">*</span>
                <div>
                  <Input
                    name="designation"
                    value={form1.designation}
                    onChange={e => {
                      handleChange1(e)
                    }}
                    required
                    type="text"
                    className="form-control"
                    placeholder="Enter Designation"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </Col>
              <Col className="mt-3" md="6">
                <Label for="basicpill-firstname-input1">
                  States <span className="text-danger">*</span>
                </Label>
                <select
                  type="text"
                  className="form-select"
                  id="basicpill-firstname-input1"
                  placeholder="Enter Bannner Name"
                  required
                  name="state"
                  value={form1.state}
                  onChange={e => {
                    handleChange4(e)
                  }}
                >
                  <option value="">Select</option>
                  {states.map((data, key) => (
                    <option key={key} value={data.stateName}>
                      {data.stateName}
                    </option>
                  ))}
                </select>
              </Col>
              <Col className="mt-3" md="6">
                        <Label for="basicpill-firstname-input1">
                          City <span className="text-danger">*</span>
                        </Label>
                        <select
                          className="form-select"
                          id="basicpill-firstname-input1"
                          placeholder="Enter city name"
                          required
                          name="city"
                          value={form1.city}
                          onChange={e => {
                            handleChange1(e)
                          }}
                        >
                           <option value="">Select</option>
                          {cities.map((data, key) => (
                            <option key={key} value={data.city}>
                              {data.city}
                            </option>
                          ))}
                        </select>
                      </Col>
           
           
              <Col className="mt-3" md="6">
                <Label for="basicpill-firstname-input1">
                  Area <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter city name"
                  required
                  name="area"
                  value={form1.area}
                  onChange={e => {
                    handleChange(e)
                  }}
                />
              </Col>
              <Col className="mt-3" md="6">
                <Label>Status</Label> <span className="text-danger">*</span>
                <select
                  value={form1.status}
                  required
                  onChange={e => {
                    handleChange1(e)
                  }}
                  name="status"
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {/* <Input name="s" onChange={(e) => { handleChange(e) }} required type="password" placeholder="Enter password" /> */}
              </Col>

              <Col className="mt-3" md="12">
                <Label>Address</Label> <span className="text-danger">*</span>
                <div>
                  <textarea
                    className="form-control"
                    name="address"
                    value={form1.address}
                    onChange={e => {
                      handleChange(e)
                    }}
                    required
                    type="text"
                    placeholder="Enter Address"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </Col>
            </Row>
            <div className="text-end mt-4">
              <Button type="submit" color="success m-1" outline>
                Submit <i className="bx bx-check-circle"></i>
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setshow1(!show1)
                }}
                color="danger m-1"
                outline
              >
                Cancel <i className="bx bx-x-circle"></i>
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <Modal size="sm" className="mt-5 pt-5" isOpen={show13} toggle={toggle13}>
        <ModalHeader toggle={toggle13}>Delete Agent</ModalHeader>
        <ModalBody>
          <div>
            <div>
              <form
                onSubmit={e => {
                  deleteAgents(e)
                }}
              >
                <label>Password</label>
                <input
                  required
                  placeholder="Enter Password"
                  type="text"
                  className="form-control"
                  name="password"
                  value={form2.password}
                  onChange={(e) => {
                    handleChange2(e)
                  }}
                />

                <div className="text-end mt-3">
                  <Button type="submit" color="success m-1" outline>
                    Submit <i className="bx bx-check-circle"></i>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setshow13(!show13)
                    }}
                    color="danger m-1"
                    outline
                  >
                    Cancel <i className="bx bx-x-circle"></i>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default Users
