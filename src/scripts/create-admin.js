// scripts/create-admin.js
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Variables d'environnement manquantes");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  try {
    console.log("🔄 Création de l'utilisateur admin...");

    // 1. Créer l'utilisateur via l'API admin
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: 'fossilisphere@outlook.com',
      password: 'tititou*6711031998',
      email_confirm: true,
      user_metadata: {
        username: 'Christian',
        role: 'admin',
      },
    });

    if (userError) {
      console.error('❌ Erreur création utilisateur:', userError.message);

      // Essayer de récupérer l'utilisateur s'il existe déjà
      const { data: existingUser } = await supabase.auth.admin.listUsers();
      const user = existingUser.users.find((u) => u.email === 'fossilisphere@outlook.com');

      if (user) {
        console.log('✅ Utilisateur existe déjà, ID:', user.id);
        await createProfile(user.id);
        return;
      }
      return;
    }

    console.log('✅ Utilisateur créé, ID:', userData.user.id);

    // 2. Créer le profil
    await createProfile(userData.user.id);
  } catch (error) {
    console.error('💥 Erreur:', error.message);
  }
}

async function createProfile(userId) {
  try {
    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      username: 'Christian',
      grade: 'Tyrannosaure',
      contributions_count: 1000,
    });

    if (error) {
      console.error('❌ Erreur création profil:', error.message);
    } else {
      console.log('✅ Profil créé/mis à jour');
    }
  } catch (error) {
    console.error('💥 Erreur profil:', error.message);
  }
}

createAdminUser();
