import { Link } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { DataContext } from '../DataProvider';
import { useAuth, useUser, useDatabase } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { ref, child, get } from 'firebase/database';




let Navbar = () => {

    const auth = useAuth();

    const db = useDatabase();

    const { cart, setCart } = useContext(DataContext);

    const { status, data: user } = useUser();

    const signin = async () => {
        const provider = new GoogleAuthProvider();
        let u = await signInWithPopup(auth, provider);
    }

    const signout = async () => {
        await signOut(auth);
        setCart({ items: {}, total: 0, size: 0 });
    }

    useEffect(() => {
        if (user) {
            get(child(ref(db), `carts/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setCart(snapshot.val());
                } else {
                }
            }).catch((error) => {
            });
        }
    }, [user]);

    return (
        <div>
            <div id="navcon" className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to='/shop'>Pricing</Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav ml-auto align-items-center">
                        {status === 'loading' ?
                            <li className="nav-item">
                                <p className="nav-link m-0">Logging in...</p>
                            </li>
                            : user ?
                                <>
                                    <li className="nav-item">
                                        <p className="nav-link m-0">Welcome, {user.displayName}!</p>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-sm btn-info mr-2" onClick={signout}>Sign out</button>
                                    </li>
                                </>
                                :
                                <li className="nav-item">
                                    <button className="btn btn-sm btn-info mr-2" onClick={signin}>Sign in</button>
                                </li>
                        }
                        <li className="nav-item">
                            {cart.size === 0 ?
                                <Link className="btn btn-sm btn-info m-1 mt-1 p-1" to='/shop'>Hire A Hero</Link>
                                :
                                <Link className="btn btn-sm btn-info m-1 mt-1 p-1 pl-2" to='/cart'><i>Cart:</i>  {cart.size} | ${cart.total.toFixed(2)}</Link>
                            }

                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
