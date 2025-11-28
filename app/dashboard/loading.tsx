import { Loader2 } from "lucide-react"

const loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="size-16" />
    </div>
  )
}

export default loading