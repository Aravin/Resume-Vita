import { useState } from 'react';
import Draggable from 'react-draggable';
import { FaGripVertical, FaArrowUp, FaArrowDown, FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";

interface DraggableFormItemProps {
  children: React.ReactNode;
  index: number;
  totalItems: number;
  onDragStop: (oldIndex: number, newIndex: number) => void;
  onMove: (index: number, direction: 'up' | 'down' | 'top' | 'bottom') => void;
}

const DraggableFormItem: React.FC<DraggableFormItemProps> = ({ 
  children, 
  index, 
  totalItems, 
  onDragStop, 
  onMove 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = (e: any, data: any) => {
    setIsDragging(false);
    const newIndex = Math.round(data.y / 100); // Approximate height of each item
    
    if (newIndex !== index) {
      onDragStop(index, newIndex);
    }
    
    setPosition({ x: 0, y: 0 }); // Reset position
  };

  return (
    <Draggable
      axis="y"
      position={position}
      onStart={handleDragStart}
      onStop={handleDragStop}
      bounds="parent"
      handle=".drag-handle"
    >
      <div
        className={`
          group relative
          p-4 rounded-lg border-2 
          ${isDragging 
            ? 'border-blue-300 shadow-xl bg-white scale-[1.02] z-50' 
            : 'border-gray-100 hover:border-gray-300 hover:shadow-md'
          }
          transition-all duration-200 ease-in-out
        `}
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 flex flex-col gap-1">
          <button 
            type="button"
            title="Drag to reorder"
            className="drag-handle flex items-center justify-center w-8 h-8 
              rounded-md bg-gray-100 hover:bg-gray-200 
              cursor-grab active:cursor-grabbing
              transition-colors duration-200"
            style={{ touchAction: 'none' }}
          >
            <FaGripVertical className="text-gray-500 group-hover:text-gray-700" size={16} />
          </button>
          
          <button 
            type="button"
            title="Move to top"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMove(index, 'top');
            }}
            disabled={index === 0}
            className={`w-8 h-8 rounded-md flex items-center justify-center
              ${index === 0 
                ? 'bg-gray-50 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
              } transition-colors duration-200`}
          >
            <FaAngleDoubleUp size={16} />
          </button>
          
          <button 
            type="button"
            title="Move up"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMove(index, 'up');
            }}
            disabled={index === 0}
            className={`w-8 h-8 rounded-md flex items-center justify-center
              ${index === 0 
                ? 'bg-gray-50 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
              } transition-colors duration-200`}
          >
            <FaArrowUp size={16} />
          </button>
          
          <button 
            type="button"
            title="Move down"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMove(index, 'down');
            }}
            disabled={index === totalItems - 1}
            className={`w-8 h-8 rounded-md flex items-center justify-center
              ${index === totalItems - 1 
                ? 'bg-gray-50 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
              } transition-colors duration-200`}
          >
            <FaArrowDown size={16} />
          </button>
          
          <button 
            type="button"
            title="Move to bottom"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMove(index, 'bottom');
            }}
            disabled={index === totalItems - 1}
            className={`w-8 h-8 rounded-md flex items-center justify-center
              ${index === totalItems - 1 
                ? 'bg-gray-50 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
              } transition-colors duration-200`}
          >
            <FaAngleDoubleDown size={16} />
          </button>
        </div>
        
        <div className="pl-2">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableFormItem;
