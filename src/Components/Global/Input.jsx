export default function Input(props){
    
    return(
        <div className={`${props.cla}`}>
            <input className={`w-full border-2`} {...props}/>
        </div>
    )
}