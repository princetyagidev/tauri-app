const TabLikeEditing = () => {
    const totalCells = 3; // Adjust based on the number of cells
  
    return (
      <div>
        {[...Array(totalCells)].map((_, index) => (
          <EditableCell key={index} index={index} totalCells={totalCells} />
        ))}
      </div>
    );
  };
  
  export default TabLikeEditing;