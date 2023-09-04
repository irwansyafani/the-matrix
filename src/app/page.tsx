"use client"
import { useState } from "react"
import SearchTarget from "@/components/search-target"
import GeneratedTable from "@/components/generated-table"

const HomePage = () => {
  const [data, setData] = useState([])

  const getIndexOfK = (arr: number[][], k: number) => {
    for (let i = 0; i < arr.length; i++) {
      const index = arr[i].indexOf(k)
      if (index > -1) {
        return [i + 1, index + 1]
      }
    }
    return false
  }

  return (
    <div>
      <GeneratedTable data={data} setData={setData} />
      <SearchTarget
        onSearch={async (target: number, callback: any) => {
          const result = getIndexOfK(data, +target)
          const storeData = await fetch(
            "https://matrixapi.frackment.id/api/matrix",
            {
              method: "POST",
              body: {
                m: data,
                n: +target,
                result: result ? result.join(", ") : false,
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2E4ZjhhYTJhZmViYmY4OGU0OGU1NGVjNzM1ZWUxNGE0NGY5MjdiOTczN2VhM2UzZmVmYjRiNTUyNTViODQ5NjFlMDA0MmU0ZmQ5OWM0MjQiLCJpYXQiOjE2OTM3NTgxNTEuMDM3MjkxLCJuYmYiOjE2OTM3NTgxNTEuMDM3Mjk1LCJleHAiOjE3MjUzODA1NTAuOTQzMjczLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.W6pnaaW3vGgRAp0iq7xIrbiM4Z-uvK4fACQLWEdfiKbHYVwsW5ImDsz73py_De0xMuyhCpRJbztGwDHLeS9a41IBZLuvYOl4G1fp1AiSLa3vyxQf76esR4TFyKbkABHx5HECaAo6DwA8OaKryRFzKZFsFwNzvBevqa7gDz2hPaQcWotmd9f5xI1kEh77pZZBeqhUKfhLHtVk_xWoNSK_EOjmgbiuJwheSjbAbFk40IUwPLGjlY6gMvk_-gnnLWNN0uDAbj9fRf81PJwpuJ9-2Xt-rKCjVcBtotwpTupM9DA1gnACRv_yXFrpeC1Rd22mHYlec3PZledZZopUpm-1lTq1aViZ-TeSdZ7bOqlldlbbs1oZ57VijgEQeLuAToYD4g8_kzRSdhGE7RisqjaHex-3eIuyfNf4W_Eo6FeJP5zDeZSYYGgrYoVJIU9tbqXBBDy1CFkft5DjvFl0TQCjvMLv7vqk6NOAOnRML75xN25Isa5SBOavAY9lzOq_5Uia2mlkrAcONPmPtgUDXZVGieheM-wP3ysEW-XZYT1zsJ85ELWTHA8nxQEHidksqvARGREl5646xCt8td5vGrfWwWMgDcAJE2O1nRm5T3i4krT4dhEQLNUKNALHT73me_cq5Xig2lCGnbwpz9f6ZuivTaUGIuXZQQmEczHRTD99vGY`,
              },
            }
          )
          callback(result)
        }}
      />
    </div>
  )
}

export default HomePage
