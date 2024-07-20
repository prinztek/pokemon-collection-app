import ClipLoader from "react-spinners/ClipLoader";
import "./LoadingComponent.css"
const LoadingComponent = () => {
  return (
    <>
      <ClipLoader color={"#0000FF"} speedMultiplier={1.2}/>
      <p className="loading-text">Loading Pokemons</p>
    </>
  );
};

export default LoadingComponent;


