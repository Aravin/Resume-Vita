export default function Loader(props: any) {
  return (
    <div className="flex h-96">
      <div className="m-auto">
        <div className="lds-roller">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
        <div>
          { props.message || 'Loading...' }
        </div>
      </div>
    </div>

  );
}
