export default function InputText({ children }: any) {
  return (
    <div className="form-control">
  <label className="label">
    <span className="label-text">Work Title</span>
  </label> 
  <input type="text" placeholder="Work Title" {...register("Work Title", {required: true})} />
</div>
  )
}