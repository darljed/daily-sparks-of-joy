import { createClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    const { id } = await params;

    // get spark from supabase where id = id

    const supabase = createClient();
    const { error, data } = await supabase
        .from("sparks")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data, message: "Data fetched successfully" });
}