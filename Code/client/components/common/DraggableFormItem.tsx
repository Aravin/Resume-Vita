import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { FaGripVertical, FaArrowUp, FaArrowDown, FaAngleDoubleUp, FaAngleDoubleDown, FaTimes } from "react-icons/fa";

interface DraggableFormItemProps {
  children: React.ReactNode;
  index: number;
  totalItems: number;
  onDragStop: (oldIndex: number, newIndex: number) => void;
  onMove: (index: number, direction: 'up' | 'down' | 'top' | 'bottom') => void;
  onDelete: (index: number) => void;
}

const DraggableFormItem: React.FC<DraggableFormItemProps> = ({ 
  children, 
  index, 
  totalItems, 
  onDragStop, 
  onMove,
  onDelete
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const nodeRef = useRef(null);

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

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(index);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      axis="y"
      position={position}
      onStart={handleDragStart}
      onStop={handleDragStop}
      bounds="parent"
      handle=".drag-handle"
    >
      <div
        ref={nodeRef}
        className={`
          group relative rounded-2xl border p-4
          ${isDragging 
            ? 'z-50 scale-[1.02] border-primary/40 bg-background shadow-xl ring-4 ring-primary/10' 
            : 'border-border/70 bg-background/70 hover:border-primary/25 hover:bg-background hover:shadow-md'
          }
          transition-all duration-200 ease-in-out
        `}
      >
        {/* Delete button and confirmation */}
        <div className="absolute right-2 top-2 z-30 flex items-center gap-2">
          {showDeleteConfirm ? (
            <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background px-2 py-1 shadow-md">
              <span className="text-sm text-muted-foreground">Delete?</span>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-md bg-destructive px-2 py-1 text-xs text-destructive-foreground transition-colors hover:opacity-90"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={cancelDelete}
                className="rounded-md bg-muted px-2 py-1 text-xs text-foreground transition-colors hover:bg-muted/80"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              title="Delete item"
              onClick={handleDelete}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-destructive opacity-0 transition-all duration-200 hover:bg-destructive/20 group-hover:opacity-100"
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>

        {/* Movement controls */}
        <div
          className={`absolute left-4 top-4 z-10 flex flex-wrap items-center gap-1.5 ${
            showDeleteConfirm ? 'right-44 md:right-48' : 'right-14'
          }`}
        >
          <button 
            type="button"
            title="Drag to reorder"
            className="drag-handle flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background/95 shadow-sm
              cursor-grab active:cursor-grabbing
              transition-colors duration-200"
            style={{ touchAction: 'none' }}
          >
            <FaGripVertical className="text-muted-foreground group-hover:text-foreground" size={16} />
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
            className={`flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background/95 shadow-sm
              ${index === 0 
                ? 'text-muted-foreground/40' 
                : 'text-muted-foreground hover:border-primary/25 hover:text-foreground'
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
            className={`flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background/95 shadow-sm
              ${index === 0 
                ? 'text-muted-foreground/40' 
                : 'text-muted-foreground hover:border-primary/25 hover:text-foreground'
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
            className={`flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background/95 shadow-sm
              ${index === totalItems - 1 
                ? 'text-muted-foreground/40' 
                : 'text-muted-foreground hover:border-primary/25 hover:text-foreground'
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
            className={`flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background/95 shadow-sm
              ${index === totalItems - 1 
                ? 'text-muted-foreground/40' 
                : 'text-muted-foreground hover:border-primary/25 hover:text-foreground'
              } transition-colors duration-200`}
          >
            <FaAngleDoubleDown size={16} />
          </button>
        </div>
        
        <div className="pt-12 md:pt-14">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableFormItem;
