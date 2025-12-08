function PropertyPage({ params, searchParams }) {
  return (
    <div>
      Property Page {params.id}
      <br />
      Search param: {searchParams.name}
    </div>
  )
}

export default PropertyPage