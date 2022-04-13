import "../../App.css"
import Header from '../../components/Header'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import ApiSupplierService from "../../services/supplier/ApiSupplierService";

import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'




const AddProductScreen1 = () => {
    const [productName, setproductName] = useState(0)
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [discount, setdiscount] = useState('')
    const [qty, setqty] = useState('')
    const [categoryName, setcategoryName] = useState('')
    const [productImage, setproductImage] = useState(undefined)
    const backToOrderHistory = () => { }


    // get the history object
    const history = useHistory()

    // gets called when user selects an image
    const onFileSelect = (event) => {
        setproductImage(event.target.files[0])
    }

    useEffect(() => {
        ApiSupplierService.fetchProductCategoryName(window.localStorage.getItem("user_id"))//Hard Coded Make Sure if the category id and supplier id is same
        .then((res) => {
            setcategoryName(res.data.result)
        });
    })


    const addProduct = () => {
        console.log(categoryName)
        console.log(productName)

        if (productName === 0) {
            alert("Please Enter Product Name")

        } else if (description === '') {
            alert("Please Enter Description")
        } else if (price === '') {
            alert("Please Enter Price")
        } else if (discount === '') {
            alert("Please Enter Discount")
        } else if (qty === '') {
            alert("Please Enter Quantity")
        } else if (productImage === undefined) {
            alert("Please Select Image")
        } else {
            const data = new FormData()
            data.append('productName', productName)
            data.append('description', description)
            data.append('price', price)
            data.append('discount', discount)
            data.append('qty', qty)
            data.append('productImage', productImage)
            data.append('categoryName', categoryName)

            console.log(data)
            // axios.post(url+`/addProductBySupplier`, data)
            // .then(res => {
            //     alert("Product Added successfully")
            //     history.push('/supplierhome')
            // })
            // .catch(err => {
            //     console.log(err)
            // })


            ApiSupplierService.addProductBySupplier(categoryName, data)
                .then(res => {
                   
                    alert("Product Added successfully")
                    console.log(res)
                    history.push('/supplierhome');
                });
        }
    }


    return (
        <div>
            <Navigation />
            <div className="main">
                <Header title="Add Product" />
                <div className="form">
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label">Product Name</label>
                        <div class="col-sm-10">
                            <input type="text" required autoComplete="off" class="form-control" name="productName" onChange={(e) => { setproductName(e.target.value) }} />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label">Product Description</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="description" onChange={(e) => { setdescription(e.target.value) }} />
                        </div>

                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label">MRP</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="price" onChange={(e) => { setprice(e.target.value) }} />

                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label">Discount %</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" name="discount" onChange={(e) => { setdiscount(e.target.value) }} />
                        </div>
                    </div>



                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label">Quantity</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" name="qty" onChange={(e) => { setqty(e.target.value) }} />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label">Category name</label>

                        <div class="col-sm-10">
                            <input type="text" class="form-control" value={categoryName} readOnly />
                        </div>




                        { /* -------------------------------------------------------------------------------------------------- */}
                        {/* image uplod */}
                        <div class="row mb-3">
                            <label class="col-sm-2 col-form-label" for="customFile">Upload Image</label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control" id="customFile" onChange={onFileSelect} />
                            </div>
                        </div>




                    </div>
                    <div className="mb-3">
                        {/* <div className="float-start" >
                                <button className="btn4 btn-success" onClick={backToOrderHistory}>Home</button>
                            </div> */}
                        <button className="btn btn-dark float-center" onClick={addProduct} >
                            Add Product
                        </button>
                        <br></br>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default AddProductScreen1;