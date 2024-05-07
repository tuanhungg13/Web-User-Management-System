import { useEffect, useState } from "react";
import { FetchAllUser, DeleteUser } from "../service/userService";
import ReactPaginate from 'react-paginate';
import ModalDelete from "./modalDelete";
import { toast } from "react-toastify";
import ModalCreateUser from "./modalCreate_EditUser";

const Users = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({})
    const [actionModal, setActionModal] = useState("");
    const [dataModalEditUser, setDataModalEditUser] = useState({})

    useEffect(() => {
        fetchUsers();
    }, [currentPage])

    const fetchUsers = async () => {
        let response = await FetchAllUser(currentPage, 10);
        if (response && response.data && +response.data.EC === 0) {
            console.log(response.data.DT.listUsers)
            setTotalPages(response.data.DT.totalPages);
            setListUsers(response.data.DT.listUsers);
        }
    }

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        fetchUsers();
    }

    const handleDeleteUser = (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
    }

    const handleCloseModal = () => {
        setIsShowModalDelete(false);
        setIsShowModal(false)
        setDataModal({});
        //setDataModalEditUser({});
    }
    const confirmDeleteUser = async () => {
        let response = await DeleteUser(dataModal);
        if (response && +response.data.EC === 0) {
            toast.success(response.data.EM)
            await fetchUsers();
            setIsShowModalDelete(false);
        }
        else {
            toast.error(response.data.EM)
        }
    }
    const handleCreateUser = () => {
        setActionModal("CREATE");
        setIsShowModal(true);
    }

    const handleEditUser = (user) => {
        setDataModalEditUser(user);
        setActionModal("UPDATE");
        setIsShowModal(true);
    }
    return (
        <>
            <div className="container">
                <div className="mangage-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3 className="mt-3">List Users</h3>
                        </div>
                        <div className="actions my-3">
                            <button className="btn btn-primary">Refresh</button>
                            <button className="btn btn-success"
                                onClick={() => { handleCreateUser() }}>Add New User</button>
                        </div>
                    </div>

                    <div className="user-body">
                        <table className="table table-hover table-bordered ">
                            <thead>
                                <tr>
                                    <th scope="col">N.O</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Group</th>
                                    <th>Acctions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers.map((item, index) => {
                                    return (
                                        <tr key={`row-${index}`}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.address}</td>
                                            <td>{item.Group ? item.Group.nameGR : ""}</td>
                                            <td>
                                                <button className="btn btn-warning me-3"
                                                    onClick={() => { handleEditUser(item) }}>Edit</button>
                                                <button className="btn btn-danger"
                                                    onClick={() => { handleDeleteUser(item) }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                    <div className="user-footer">
                        {totalPages > 1 &&
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        }
                    </div>

                </div>
            </div>
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleCloseModal}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal} />

            <ModalCreateUser
                show={isShowModal}
                handleClose={handleCloseModal}
                fetchUsers={fetchUsers}
                action={actionModal}
                dataModalEditUser={dataModalEditUser} />
        </>
    )
}

export default Users