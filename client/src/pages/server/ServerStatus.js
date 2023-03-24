import Status from "../../components/Status"
import { useState, useEffect } from "react"

const ServerStatus = () => {
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState(true)

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false))
  }, [])

  return (
    <p>
      Estado del servidor:
      {loading ? " Cargando..." : <Status status={status} />}
    </p>
  )
}

export default ServerStatus
