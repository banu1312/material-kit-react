export default function formattedValue(value){
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}