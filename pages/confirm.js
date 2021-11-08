import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import Map from './components/Map'
import { useRouter } from 'next/router'


export const Confirm = () => {
    const router = useRouter();
    const { pickup, dropoff } = router.query;

    console.log("Pickup: ", pickup)
    console.log("Dropoff: ", dropoff)

    const [ pickupCoordinates, setPickupCoordinates ] = useState()
    const [ dropoffCoordinates, setDropoffCoordinates ] = useState()

    const getPickupCoordinates = (pickup) => {
        fetch
        (`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
             new URLSearchParams({
                 access_token: 
                     "pk.eyJ1IjoiY2hyaXNkZXY5OTQiLCJhIjoiY2t2bWFzeW5wOWsxZjJ2cGdyZmx5NHEzZiJ9.1wQjqtuxaAE6nddiUnixgg",
                 limit: 1
             })
        )
        .then((response) => response.json())
        .then((data) => {
            setPickupCoordinates(data.features[0].center);
        });
    }

    const getDropoffCoordinates = (dropoff) => {
        fetch
            (`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
             new URLSearchParams({
                 access_token: 
                     "pk.eyJ1IjoiY2hyaXNkZXY5OTQiLCJhIjoiY2t2bWFzeW5wOWsxZjJ2cGdyZmx5NHEzZiJ9.1wQjqtuxaAE6nddiUnixgg",
                 limit: 1
             })
        )
        .then((response) => response.json())
        .then((data) => {
            setDropoffCoordinates(data.features[0].center)
        })
    }

    useEffect(() =>{
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    }, [pickup, dropoff])

    

    return (
        <Wrapper>
            <Map 
            pickupCoordinates={pickupCoordinates}
            dropoffCoordinates={dropoffCoordinates}
            />
            <RideContainer>

            </RideContainer>

        </Wrapper>
    )
}

export default Confirm

const Wrapper = tw.div`
flex h-screen flex-col 
`
const RideContainer = tw.div`
flex-1
`