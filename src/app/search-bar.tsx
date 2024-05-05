"use client"

import { z } from "zod"
 import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { desc } from "drizzle-orm"
// import { createRoomAction } from "./action"
import { useRouter, useSearchParams } from "next/navigation"
import { createRoomAction } from "./create-room/action"
import { SearchIcon } from "lucide-react"
import { use, useEffect } from "react"
 export function SearchBar() {
    const router = useRouter();
    const query=useSearchParams()
    const formSchema = z.object({
      search: z.string().min(0).max(50),
    })
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") ?? "",

    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    if(values.search){
      router.push(`/?search=${values.search}`)
    }
    else{
      router.push(`/`)
      
    }
  }
  const search=query.get("search")
  useEffect(() => {
    form.setValue("search", search ?? "")
  }
  , [search,form])
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex gap-3">
        
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>

              <FormControl>
                <Input {...field} className="w-[440px]" placeholder="Search by keywords eg:typescript,nextjs,react " />
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />

          
        <Button type="submit" >
            <SearchIcon />
            Submit</Button>
  {query.get("search") && (
          <Button
            variant="link"
            onClick={() => {
              form.setValue("search", "");
              router.push("/");
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  )
}
