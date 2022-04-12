import React, { Component } from 'react'
import ApiCustomerService from "../../services/customer/ApiCustomerService";
import Navigation from "../../components/Navigation";
import { send } from 'emailjs-com';





class PaymentScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            paymentInfo: '',
            message: ''
        }
        this.payment = this.payment.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.addOrderDetail = this.addOrderDetail.bind(this);
        this.paymentDetails = this.paymentDetails.bind(this);
        this.selectCredit = this.selectCredit.bind(this);
        this.selectDebit = this.selectDebit.bind(this);
        this.addOrderIdtoOrderAddress = this.addOrderIdtoOrderAddress.bind(this);
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    addOrder() {
        ApiCustomerService.addorders(window.localStorage.getItem("total_price"), window.localStorage.getItem("user_id"))
            .then(res => {
                JSON.stringify(window.localStorage.setItem("orderId", res.data.result))
                this.addOrderDetail();
            });

    }

    addOrderDetail() {
        ApiCustomerService.addDetails(window.localStorage.getItem("user_id"), JSON.parse(window.localStorage.getItem("orderId")))
            .then(res => {
                JSON.stringify(window.localStorage.setItem("deliveryBoyId", res.data.result))
                this.paymentDetails();
            });

    }

    paymentDetails() {
        this.state.payment = {
            paymentType: this.state.paymentInfo,
            deliveryBoyId: JSON.parse(window.localStorage.getItem("deliveryBoyId")),
            orderId: JSON.parse(window.localStorage.getItem("orderId"))
        };
        ApiCustomerService.addpaymentDetails(this.state.payment);
        this.addOrderIdtoOrderAddress();
    }

    addOrderIdtoOrderAddress() {
        ApiCustomerService.addOrderIdtoOrderAddress(window.localStorage.getItem("address_id"), window.localStorage.getItem("orderId"))
    }

    onMail() {


        let msg = 'Order Placed Sucessfully injoyyyyyyyyyyy..';

        let tosend = {
            from_name: 'efashion mall',
            to_name: localStorage.getItem('user_fname'),
            message: msg,
            reply_to: localStorage.getItem('user_email'),
        }
        send(
            'service_rgmeitn',
            'template_z6651l4',
            tosend,
            'UXei6dZOJ5uGLmGVi'
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Mail Send Sucessfully!!')
            })
            .catch((err) => {
                console.log('FAILED...', err);
            });

    }

    payment() {
        this.addOrder();

        alert('Payment Done')
        this.onMail();
        alert('email Done')
        window.localStorage.removeItem("cart_size");
        window.localStorage.removeItem("deliveryBoyId");
        window.localStorage.removeItem("orderId");

        this.props.history.push('/home');
    }

    selectCredit() {
        this.state.paymentInfo = "CREDIT";
    }

    selectDebit() {
        this.state.paymentInfo = "DEBIT";
    }

    render() {
        return (
            <div>
                <Navigation />
                <div>
                 <div className="containercheckout" >
                    {/*<div>
                        <div className="float-center">
                            <h5>Total Price : {window.localStorage.getItem("total_price")}</h5>
                            <br />
                            <div className="position1">
                                <div className="dropdown">
                                    <a className="btn btn-dark dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Payment Type
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li><a className="dropdown-item" onClick={() => { this.selectCredit() }}>CREDIT</a></li>
                                        <li><a className="dropdown-item" onClick={() => { this.selectDebit() }}>DEBIT</a></li>
                                    </ul>
                                </div>
                            </div>
                            <br />

                            <button className="btn4 btn-primary" style={{ width: '150px' }} onClick={() => this.payment()}>Payment</button>
                        </div>
                    </div> */}
                    

                    <div>
                        <h4 class="mb-3">Payment for <h5 className="nameColor7">Total Price : {window.localStorage.getItem("total_price")}</h5></h4>

                        <div class="my-3">
                            <div class="form-check">
                                <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required onClick={() => { this.selectCredit() }}/>
                                    <label class="form-check-label" for="credit" >Credit card</label>
                            </div>
                            <div class="form-check">
                                <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required onClick={() => { this.selectDebit() }}/>
                                    <label class="form-check-label" for="debit" >Debit card</label>
                            </div>
                            <div class="form-check">
                                <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required/>
                                    <label class="form-check-label" for="paypal">PayPal</label>
                            </div>
                        </div>

                        <div class="row gy-3">
                            <div class="col-md-6">
                                <label for="cc-name" class="form-label">Name on card</label>
                                <input type="text" class="form-control" id="cc-name" placeholder="" required/>
                                    <small class="text-muted">Full name as displayed on card</small>
                                    <div class="invalid-feedback">
                                        Name on card is required
                                    </div>
                            </div>

                            <div class="col-md-6">
                                <label for="cc-number" class="form-label">Credit card number</label>
                                <input type="text" class="form-control" id="cc-number" placeholder="" required/>
                                    <div class="invalid-feedback">
                                        Credit card number is required
                                    </div>
                            </div>

                            <div class="col-md-3">
                                <label for="cc-expiration" class="form-label">Expiration</label>
                                <input type="text" class="form-control" id="cc-expiration" placeholder="" required/>
                                    <div class="invalid-feedback">
                                        Expiration date required
                                    </div>
                            </div>

                            <div class="col-md-3">
                                <label for="cc-cvv" class="form-label">CVV</label>
                                <input type="text" class="form-control" id="cc-cvv" placeholder="" required/>
                                    <div class="invalid-feedback">
                                        Security code required
                                    </div>
                            </div>
                        </div>

                        <hr class="my-4"/>

                            <button class="w-100 btn btn-primary btn-lg" type="submit" onClick={() => this.payment()}>Continue to Payment</button>
                        
                    </div>
                </div>
             </div>
             </div>


                    


                    );
    }
}

export default PaymentScreen