import React from 'react'
import { ThreeDots } from  'react-loader-spinner'


const Loader = () => {
    return (
                <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#525174ff" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{ displa:'flex' , justifyContent:'center', position:'relative', left:'100%', width:'100%', height:'100%', }}
                wrapperClassName=""
                visible={true}/>
    )}
                

export default Loader