import styled from 'styled-components';

/**
 * reactflow css
 */
export const FlowNodeClassname = 'custom-flow-node';
export const FlowNodeDragoverClassname = 'flow-node-dragover';
export const FlowContainerClassname = 'react-flow__pane';

/**
 * constant
 */
export const ContainerHeight = '80vh';
export const NodeHeight = 50;
export const NodeWidth = 400;
export const MinimapHeight = 120;
export const HomePreviewHeight = '35vh';

/**
 * UI
 */
export const NodeStyle = styled.div`
  width: ${NodeWidth}px;
  min-height: ${NodeHeight}px;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  color: #000;
  box-sizing: border-box;
  text-align: center;
`;

export const SiderbarNodeWrapperStyle = styled.div<{ $editable: boolean }>`
  user-select: none;
  cursor: ${props => (props.$editable ? 'grab' : 'not-allowed')};
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  transform: translate(0, 0);
`;

export const SiderbarNodeStyle = styled.div`
  width: 250px;
  min-height: ${NodeHeight / 2}px;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  color: #000;
  box-sizing: border-box;
  text-align: center;
  text-transform: capitalize;
`;

export const FlowContainer = styled.div<{ $height: string | number }>`
  width: 100%;
  position: relative;
  height: ${props => props.$height};
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  background: #fff;
`;
