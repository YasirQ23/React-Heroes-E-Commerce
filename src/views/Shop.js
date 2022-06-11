import { useState, useContext } from 'react';
import { DataContext } from '../DataProvider';
import axios from 'axios';
import { useUser, useDatabase } from 'reactfire';
import { set, ref } from 'firebase/database';


let Shop = () => {

    const getCharacters = async () => {
        let response = await axios.get('https://marvel-flask-crud-api.herokuapp.com/api/marvelcharacters');
        return response.status === 200 ? response.data : null;
    }

    const loadCharacters = async () => {
        let character = await getCharacters();
        setCharacters(Object.values(character));
    }

    const [characters, setCharacters] = useState(() => { loadCharacters(); });
    const [msg, setMsg] = useState(false);

    const { cart, setCart } = useContext(DataContext);
    // const {data: user} = useUser();
    // const db = useDatabase();

    const hireHero = characters => {
        if (cart.items[characters.name] && cart.items[characters.name].quantity >= characters.hours_available) {
            setMsg(`Sorry, ${characters.name} has no more available hours left!`);
            return
        }
        let mutableCart = { ...cart };
        mutableCart.size++;
        mutableCart.total += characters.hourly_cost;
        mutableCart.items[characters.name] ?
            mutableCart.items[characters.name].quantity++ :
            mutableCart.items[characters.name] = { 'obj': characters, 'quantity': 1 }
        setCart(mutableCart);
        setMsg(false);
    }

    if (typeof characters === 'object') {
        return (
            <div >
                <div className='row justify-content-center'>
                    {msg ? <h3>{msg}</h3> : null}
                </div>
                <div className="card-deck">
                    <div className="card">
                        <img src={characters[0].image} />
                        <div className="card-body">
                            <h5 className="card-title">{characters[0].name}</h5>
                            <p className="card-text">{characters[0].description}</p>
                            <p className="card-text">Super Powers: {characters[0].super_power}</p>
                        </div>
                        <div className="card-footer" >
                            <small className="text-muted">Hours Available: {characters[0].hours_available} </small>
                            <br></br>
                            <small className="text-muted">Cost Per Hour: ${characters[0].hourly_cost} </small>
                            <button onClick={() => { hireHero(characters[0]) }} className="btn btn-success">Hire characters!</button>
                        </div>
                    </div>
                    <div className="card">
                        <img src={characters[1].image} />
                        <div className="card-body">
                            <h5 className="card-title">{characters[1].name}</h5>
                            <p className="card-text">{characters[1].description}</p>
                            <p className="card-text">Super Powers: {characters[1].super_power}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Hours Available: {characters[1].hours_available} </small>
                            <br></br>
                            <small className="text-muted">Cost Per Hour: ${characters[1].hourly_cost} </small>
                            <button onClick={() => { hireHero(characters[1]) }} className="btn btn-success">Hire characters!</button>
                        </div>
                    </div>
                    <div className="card">
                        <img src={characters[2].image} />
                        <div className="card-body">
                            <h5 className="card-title">{characters[2].name}</h5>
                            <p className="card-text">{characters[2].description}</p>
                            <p className="card-text">Super Powers: {characters[2].super_power}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Hours Available: {characters[2].hours_available} </small>
                            <br></br>
                            <small className="text-muted">Cost Per Hour: ${characters[2].hourly_cost} </small>
                            <button onClick={() => { hireHero(characters[2]) }} className="btn btn-success">Hire characters!</button>
                        </div>
                    </div>
                    <div className="card">
                        <img src={characters[3].image} />
                        <div className="card-body">
                            <h5 className="card-title">{characters[3].name}</h5>
                            <p className="card-text">{characters[3].description}</p>
                            <p className="card-text">Super Powers: {characters[3].super_power}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Hours Available: {characters[3].hours_available} </small>
                            <br></br>
                            <small className="text-muted">Cost Per Hour: ${characters[3].hourly_cost} </small>
                            <button onClick={() => { hireHero(characters[3]) }} className="btn btn-success">Hire characters!</button>
                        </div>
                    </div>
                </div>
            </div>)

    } else {
        return (<div>Calling All Heroes Available</div>)
    }


}
export default Shop;