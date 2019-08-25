import React, { useState, useEffect } from "react";
import { Dropdown, Carousel, Button, Modal } from "react-bootstrap";

export const First = () => {
  const [slidesToShow, setSlides] = useState(0);
  const [selectedNumber, setSelected] = useState([]);
  const [show, toggleModal] = useState(false);

  const handleCarousel = value => {
    setSlides(Number(value));
    setSelected(prevState => [...prevState, Number(value)]);
  };

  const storeInLocalStorage = (key = "selectedNumber") => {
    return localStorage.setItem(key, JSON.stringify(selectedNumber));
  };

  const getFromLocalStorage = (key = "selectedNumber") => {
    return localStorage.getItem(key);
  };

  const clearData = () => {
    localStorage.clear();
    setSelected([]);
    setSlides(0);
  };

  useEffect(() => {
    let getSelectedFromLocalStorage =
      JSON.parse(getFromLocalStorage("selectedNumber")) || [];
    if (!!getSelectedFromLocalStorage && getSelectedFromLocalStorage.length) {
      setSelected(getSelectedFromLocalStorage);
      setSlides(
        getSelectedFromLocalStorage[getSelectedFromLocalStorage.length - 1]
      );
    }
  }, []);

  const handleModal = () => {
    toggleModal(prevState => !prevState);
    storeInLocalStorage();
  };
  return (
    <div>
      <div className="mt-5">
        <Dropdown onSelect={handleCarousel}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedNumber.length
              ? `Selected ${selectedNumber[selectedNumber.length - 1]}`
              : "Select Number"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[...Array(20).keys()].map((num, index) => (
              <Dropdown.Item key={num} eventKey={index + 1}>
                {index + 1}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
          <Button variant="primary" className="ml-3" onClick={clearData}>
            Clear localStorage and State
          </Button>
          <div className="mt-5">
            <ControlledCarousel slidesToShow={slidesToShow} />
          </div>
          {Boolean(slidesToShow) && (
            <Button variant="primary" size="sm" onClick={handleModal}>
              Finish
            </Button>
          )}
        </Dropdown>
        <ModalComponent
          show={show}
          selectedNumber={selectedNumber}
          handleModal={handleModal}
        />
      </div>
    </div>
  );
};

function ModalComponent({ selectedNumber, show, handleModal }) {
  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Selected Numbers</Modal.Title>
      </Modal.Header>
      <Modal.Body>{JSON.stringify([...new Set(selectedNumber)])}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ControlledCarousel({ slidesToShow = 0 }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <div>
      <Carousel
        className="h-350"
        activeIndex={index}
        direction={direction}
        onSelect={handleSelect}
      >
        {[...Array(Number(slidesToShow)).keys()].map(slides => (
          <Carousel.Item key={slides}>
            <div className="d-flex justify-content-center bg-grey">
              <img
                className="d-block"
                src="http://placekitten.com/200/300"
                alt="First slide"
              />
            </div>

            <Carousel.Caption>
              <h3>{slides + 1} slide </h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
