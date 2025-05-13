// App.jsx
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Characters from "./components/Characters.jsx";
import CharacterTraits from "./components/CharacterTraits.jsx";
import CYO from "./components/CYO.jsx";
import NavBar from "./components/NavBar.jsx";
import NotFound from "./components/NotFound.jsx";
import EditCharacter from "./components/EditCharacter.jsx";
import './App.css'; // Import CSS file for styling


function App() {
  return (
    <>
      <NavBar />
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:id" element={<CharacterTraits />} />
      <Route path="/createyourown" element={<CYO />} />
      <Route path="/editcharacter/:id" element={<EditCharacter />} />
      <Route path="*" element={<NotFound />} />
     </Routes>
    </>
  )
}

export default App
