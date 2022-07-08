use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    //program_error::ProgramError,
    pubkey::Pubkey,
};
//use std::rc::Rc;


#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct BetAccount {
    pub bet_id1: u8,
    pub bet_id2: u8,
    pub wallet_home: [u8; 32],
    pub home_odds_ones: u8,
    pub home_odds_tenths: u8,
    pub home_odds_hundredths: u8,
    pub wallet_away: [u8; 32],
    pub away_odds_ones: u8,
    pub away_odds_tenths: u8,
    pub away_odds_hundredths: u8,
}


entrypoint!(process_instruction);


pub fn process_instruction(
    _program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8],
) -> ProgramResult {

   
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;
    let mut bet_acc = BetAccount::try_from_slice(&account.data.borrow())?; 
    let admin_addr:[u8; 32] = [84, 91, 46, 17, 165, 225, 233, 73, 109, 40, 130, 12, 76, 161, 13, 84, 164, 105, 81, 226, 102, 177, 224, 220, 39, 75, 11, 129, 127, 28, 172, 220];
    let all_zeroes:[u8; 32] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

   
    if instruction_data.len() == 32 && accounts.len() == 2{
        let temp_fund_holder = next_account_info(accounts_iter)?;
        let curr_balance = **account.try_borrow_lamports()?;
        
        let match_balance = **temp_fund_holder.try_borrow_lamports()?;
       
        let mut odds = 0.0;

        if bet_acc.home_odds_ones == 0{
            
            odds = bet_acc.away_odds_ones as f32;
            odds += (bet_acc.away_odds_tenths as f32) / 10.0;
            odds += (bet_acc.away_odds_hundredths as f32) / 100.0;
        }

        if bet_acc.away_odds_ones == 0{
            
            odds = bet_acc.home_odds_ones as f32;
            odds += (bet_acc.home_odds_tenths as f32) / 10.0;
            odds += (bet_acc.home_odds_hundredths as f32) / 100.0;
        }
        
        let lamports_needed = ((curr_balance as f32) * (odds - 1.0)) as u64;
        

        if match_balance > lamports_needed || (lamports_needed - match_balance < 1000 && lamports_needed >= match_balance) {
           
            **temp_fund_holder.try_borrow_mut_lamports()? -= match_balance;
            **account.try_borrow_mut_lamports()? += match_balance;
        

            let mut input_wallet:[u8;32] = [0;32];
            for n in 0 .. 32{
                input_wallet[n] = instruction_data[n];
            }
         
            if bet_acc.home_odds_ones == 0 && bet_acc.wallet_home == all_zeroes{
                bet_acc.wallet_home = input_wallet;
                
            }
            if bet_acc.away_odds_ones == 0 && bet_acc.wallet_away == all_zeroes{
                bet_acc.wallet_away = input_wallet;
            }
        }
    }
    
    if instruction_data.len() == 1 && instruction_data[0] == 4 && accounts.len() == 2{
        let matching_acc = next_account_info(accounts_iter)?;
        let mut matching_bet_acc = BetAccount::try_from_slice(&matching_acc.data.borrow())?;
        
        if (matching_bet_acc.bet_id1 == bet_acc.bet_id1) && (matching_bet_acc.bet_id2 == bet_acc.bet_id2){
            let mut bet_acc_odds = 0.0;
            //let mut valid_acc = false;
            if bet_acc.home_odds_ones == 0{
                bet_acc_odds = bet_acc.away_odds_ones as f32;
                bet_acc_odds += (bet_acc.away_odds_tenths as f32) / 10.0;
                bet_acc_odds += (bet_acc.away_odds_hundredths as f32) / 100.0;
                if matching_bet_acc.wallet_away == all_zeroes{
                    matching_bet_acc.wallet_away = bet_acc.wallet_away;
                }
            }

            if bet_acc.away_odds_ones == 0{
                bet_acc_odds = bet_acc.home_odds_ones as f32;
                bet_acc_odds += (bet_acc.home_odds_tenths as f32) / 10.0;
                bet_acc_odds += (bet_acc.home_odds_hundredths as f32) / 100.0;
                if matching_bet_acc.wallet_home == all_zeroes{
                    matching_bet_acc.wallet_home = bet_acc.wallet_home;
                }
            }

           
        
            //if bet_acc.
            let curr_balance = **account.try_borrow_lamports()?;
            
            let lamports_needed = ((curr_balance as f32) * (bet_acc_odds - 1.0)) as u64;
            
            let matcher_balance = **matching_acc.try_borrow_lamports()?;
            
            let to_move = curr_balance * matcher_balance / lamports_needed;
            
            **account.try_borrow_mut_lamports()? -= to_move;
            **matching_acc.try_borrow_mut_lamports()? += to_move;

            matching_bet_acc.serialize(&mut &mut matching_acc.data.borrow_mut()[..])?;

        }
    }
    

    if instruction_data.len() == 1 && instruction_data[0] == 5 && accounts.len() == 2{
        let receiver = next_account_info(accounts_iter)?;
        let receiver_bytes = accounts[1].signer_key().unwrap().to_bytes();
        let balance = **account.try_borrow_lamports()?;
        if receiver_bytes == bet_acc.wallet_away || receiver_bytes == bet_acc.wallet_home{
            if bet_acc.wallet_away == all_zeroes || bet_acc.wallet_home == all_zeroes{
                **account.try_borrow_mut_lamports()? -= balance;
                **receiver.try_borrow_mut_lamports()? += balance;
            }
        }
    }

    
    if instruction_data.len() == 1 && accounts.len() == 3{
        let receiver = next_account_info(accounts_iter)?;
        let receiver_bytes = accounts[1].unsigned_key().to_bytes();
        let byte_arr_addr = accounts[2].signer_key().unwrap().to_bytes();
        
        let balance = **account.try_borrow_lamports()?;
        let admin_receive = next_account_info(accounts_iter)?;
        if byte_arr_addr == admin_addr{
            if instruction_data[0] == 2{
                if receiver_bytes == bet_acc.wallet_away || receiver_bytes == bet_acc.wallet_home{
                    **account.try_borrow_mut_lamports()? -= balance;
                    **receiver.try_borrow_mut_lamports()? += balance;
                }
            }
            if instruction_data[0] == 0{
                if receiver_bytes == bet_acc.wallet_home{
                    **account.try_borrow_mut_lamports()? -= balance;
                    **receiver.try_borrow_mut_lamports()? += (balance / 100) * 98;
                    **admin_receive.try_borrow_mut_lamports()? += balance - ((balance / 100) * 98);
                }
            }
            if instruction_data[0] == 1{
                if receiver_bytes == bet_acc.wallet_away{
                    **account.try_borrow_mut_lamports()? -= balance;
                    **receiver.try_borrow_mut_lamports()? += (balance / 100) * 98;
                    **admin_receive.try_borrow_mut_lamports()? += balance - ((balance / 100) * 98);
                }
            }
        }
    }


    if instruction_data.len() == 1 && instruction_data[0] == 3 && accounts.len() == 4{
       
        let receiver1 = next_account_info(accounts_iter)?;
        let receiver2 = next_account_info(accounts_iter)?;
        
        let receiver1_bytes = accounts[1].unsigned_key().to_bytes();
        let receiver2_bytes = accounts[2].unsigned_key().to_bytes();
        let admin_bytes = accounts[3].signer_key().unwrap().to_bytes();
        
        if admin_bytes == admin_addr && bet_acc.wallet_home == receiver1_bytes && bet_acc.wallet_away == receiver2_bytes{
            let total_lamports = **account.try_borrow_lamports()?;
            
            let mut bet_acc_odds = 0.0;
            if bet_acc.home_odds_ones == 0{
                
                bet_acc_odds = bet_acc.away_odds_ones as f32;
                bet_acc_odds += (bet_acc.away_odds_tenths as f32) / 10.0;
                bet_acc_odds += (bet_acc.away_odds_hundredths as f32) / 100.0;
                **account.try_borrow_mut_lamports()? -= total_lamports;
                **receiver2.try_borrow_mut_lamports()? += (total_lamports as f32 / bet_acc_odds) as u64;
                **receiver1.try_borrow_mut_lamports()? += total_lamports - (total_lamports as f32 / bet_acc_odds) as u64;
            }

            if bet_acc.away_odds_ones == 0{
                
                bet_acc_odds = bet_acc.home_odds_ones as f32;
                bet_acc_odds += (bet_acc.home_odds_tenths as f32) / 10.0;
                bet_acc_odds += (bet_acc.home_odds_hundredths as f32) / 100.0;
                **account.try_borrow_mut_lamports()? -= total_lamports;
                **receiver1.try_borrow_mut_lamports()? += (total_lamports as f32 / bet_acc_odds) as u64;
                **receiver2.try_borrow_mut_lamports()? += total_lamports - (total_lamports as f32 / bet_acc_odds) as u64;
            }
                                                                                                                                           
        }
    }


    
    if instruction_data.len() == 38 && accounts.len() == 1{
    
        let mut starting_wallet:[u8;32] = [0;32];
        for n in 2 .. 34{
            starting_wallet[n-2] = instruction_data[n];
        }

        bet_acc.bet_id1 = instruction_data[0];
        bet_acc.bet_id2 = instruction_data[1];
        
        if instruction_data[37] == 0{
            bet_acc.wallet_home = starting_wallet;
            bet_acc.home_odds_ones = instruction_data[34];
            bet_acc.home_odds_tenths = instruction_data[35];
            bet_acc.home_odds_hundredths = instruction_data[36];
        }

        if instruction_data[37] == 1{
            bet_acc.wallet_away = starting_wallet;
            bet_acc.away_odds_ones = instruction_data[34];
            bet_acc.away_odds_tenths = instruction_data[35];
            bet_acc.away_odds_hundredths = instruction_data[36];
        }
    }


    bet_acc.serialize(&mut &mut account.data.borrow_mut()[..])?;
    
    Ok(())
}
