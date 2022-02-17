import React from 'react'
import styled from "styled-components";

const MODAL_STYLES = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '30px 20px',
  zIndex: 1000,
  width: '25%',
  minHeight: '300px',
  minWidth: '300px',
  borderRadius: '20px', 
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Modal({ open, children, onClose }) {

  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES} onClick={onClose}/>

      <div style={MODAL_STYLES}>
        <Wrapper>
          
          {children}
        </Wrapper>
      </div>
    </>
  )
}

// const ModalWrapper = styled.div`
//   width: 800px;
//   height: 500px;
//   box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
//   background: #fff;
//   color: #000;
//   display: grid;
//   position: relative;
//   z-index: 10;
//   border-radius: 10px;
// `;

// const Background = styled.div`
//   width: 100%;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.8);
//   position: fixed;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;



// export default function Modal({ open, children, onClose }) {
//   const animation = useSpring({
//     config: {
//       duration: 250
//     },
//     opacity: open ? 1 : 0,
//     transform: open ? `translateY(0%)` : `translateY(-100%)`
//   });

//   if (!open) return null;

//   return (
//     <>
//       <Background onClick={onClose}/>
//       <ModalWrapper>
//           {children}
//         </ModalWrapper>
      
//     </>
//   )
// }