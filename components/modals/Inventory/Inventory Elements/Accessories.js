export default function AccessoriesList(character) {
  return (
    <div className="flex flex-col items-center text-gray-300 text-center">
      <div className="flex mb-2">
        <p>Items</p>
      </div>
      <div className="block overflow-auto border-gray-700 border-2 mx-auto mb-3">
        {character.accessories.map((accessory, index) => {
          return Accessory(accessory, index);
        })}
      </div>
    </div>
  );

  function Accessory(accessory, index) {
    return (
      <div
        className={`border-2 border-gray-900 bg-gray-900 m-1 grid-row-1`}
        key={index}
      >
        <div className={"px-1 py-2 flex flex-col h-full"}>
          <h4 className="text-red-400">
            {accessory.emoji + " - " + accessory.displayName}
          </h4>
          <p>{accessory.description}</p>
        </div>
      </div>
    );
  }
}
