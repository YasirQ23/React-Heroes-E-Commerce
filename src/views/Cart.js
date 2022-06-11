// import '../css/cartstyles.css'
import { useContext, useState } from 'react';
import { DataContext } from '../DataProvider';
import { useDatabase, useUser } from 'reactfire';
import { set, ref } from 'firebase/database';
import { Link } from 'react-router-dom';

let Cart = () => {
    const { cart, setCart } = useContext(DataContext);
    const cartHeros = Object.keys(cart.items)
    const listItems = cartHeros.map((hero) =>
        <li key={hero}>
            {hero}
        </li>
    );

    return (
        <div className="App">
            <div className='container d-flex'>
                <div className="card mx-auto mt-5" style={{ marginRight: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Current Heros in Cart: { listItems }</h5>
                        <h5 className="card-title">Current Cart Hours: {cart.size}</h5>
                        <h5 className="card-title">Current Cart Total: {cart.total}</h5>
                        <a className="btn btn-success" style={{width:'400px'}}>Check Out</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart