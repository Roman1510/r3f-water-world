import styled from 'styled-components'

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const MaskOverlay = () => {
  return (
    <OverlayContainer>
      <Image src={`mask.png`} alt="Mask" className="mask-image" />
    </OverlayContainer>
  )
}
