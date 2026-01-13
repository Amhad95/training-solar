import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEMO_EMAIL = "demo@nafizat.app";
const DEMO_PASSWORD = "demo123456";
const DEMO_NAME = "متدرب تجريبي";

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Check if demo user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error("Error listing users:", listError);
      return new Response(
        JSON.stringify({ error: "Failed to check existing users" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const demoUserExists = existingUsers.users.some(user => user.email === DEMO_EMAIL);

    if (demoUserExists) {
      return new Response(
        JSON.stringify({ message: "Demo user already exists", exists: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create the demo user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: {
        full_name: DEMO_NAME,
        phone: "0912345678",
        state: "الخرطوم",
        city: "الخرطوم",
        education_level: "secondary",
      },
    });

    if (createError) {
      console.error("Error creating demo user:", createError);
      return new Response(
        JSON.stringify({ error: "Failed to create demo user", details: createError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Assign student role
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({
        user_id: newUser.user.id,
        role: "student",
      });

    if (roleError) {
      console.error("Error assigning role:", roleError);
    }

    // Get first active cohort for enrollment
    const { data: cohort } = await supabaseAdmin
      .from("cohorts")
      .select("id")
      .eq("status", "active")
      .limit(1)
      .single();

    if (cohort) {
      // Enroll demo user in cohort
      await supabaseAdmin.from("enrollments").insert({
        user_id: newUser.user.id,
        cohort_id: cohort.id,
        status: "active",
      });
    }

    return new Response(
      JSON.stringify({ 
        message: "Demo user created successfully", 
        created: true,
        userId: newUser.user.id 
      }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});